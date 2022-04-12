import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {delay} from "rxjs/operators";
import {User} from "../../models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {interval} from 'rxjs';
import {Subscription} from "rxjs";
import {DialogUpdateUserComponent} from "../../components/dialog-update-user/dialog-update-user";
import {MatDialog} from "@angular/material/dialog";
import {UserUpdate} from "../../models/user-update";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-pages.component.html',
  styleUrls: ['./users-pages.component.scss'],
  providers: [HttpService],
  encapsulation: ViewEncapsulation.None
})
export class UsersPagesComponent implements OnInit, OnDestroy {

  subscription = new Subscription;
  users!: User[]
  loader: boolean = false
  idStatus: number = 100
  myInterval: number = 5000


  constructor(private httpService: HttpService, private snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadFirstUsers(this.idStatus)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  loadFirstUsers(status: number) {
    this.loader = true
    this.subscription = this.httpService.getAllUsers(status)
      .subscribe(
        (data) => {
          if (data.length == undefined) {
            this.firstErrFunction()
            this.subscription = this.httpService.getAllUsers(status).pipe(delay(this.myInterval)).subscribe((d: User[]) => {
              if (d.length == undefined) {
                this.loadFirstUsers(status)
              } else {
                this.users = d
                this.loader = false
                this.usersList(status)
              }
            })
          } else {
            data.sort((a, b) => {
              return a.id < b.id ? -1 : 1;
            })
            this.users = data
            this.loader = false
            this.usersList(status)
          }
        }
      )
  }

  usersList(status: number) {
    let observable = interval(this.myInterval)
    this.subscription = observable.subscribe(x => {
        this.loader = false
        this.httpService.getAllUsers(status)
          .subscribe(
            (data) => {
              if (data.length == undefined) {
                this.subscription.unsubscribe()
                this.usersList(status)
              } else {
                data.sort((a, b) => {
                  return a.id < b.id ? -1 : 1;
                })
                this.users = data
              }
            }
          )
      }
    )
  }

  clickUpdateUser($event: UserUpdate) {
    this.subscription.unsubscribe()
    const dialogRef = this.dialog.open(DialogUpdateUserComponent, {
      width: '916px',
      height: '573px',
      panelClass: 'my-dialog',
      data: {
        id: $event.id,
        fname: $event.fname,
        name: $event.name,
        mname: $event.mname,
        status: $event.status
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.usersList(this.idStatus)
    })
  }


  firstErrFunction() {
    this.snackBar.open('Ошибка с сервера', "x", {
      panelClass: ["red-snackbar"]
    })._dismissAfter(4000)
  }

  clickAll($event: number) {
    this.subscription.unsubscribe()
    this.loadFirstUsers(this.idStatus)
    this.idStatus = 100;
  }

  clickBlock($event: number) {
    this.subscription.unsubscribe()
    this.loadFirstUsers($event)
    this.idStatus = $event;
  }

  clickActive($event: number) {
    this.subscription.unsubscribe()
    this.loadFirstUsers($event)
    this.idStatus = $event;
  }
}
