import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpService} from "../../services/http.service";
import {ListUsersComponent} from "../list-users/list-users.component";
import {FormGroup, FormControl} from '@angular/forms';
import {UserUpdate} from "../../models/user-update";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'dialog-update-user',
  templateUrl: './dialog-update-user.html',
  styleUrls: ['./dialog-update-user.scss'],
  providers: [HttpService]
})

export class DialogUpdateUserComponent implements OnInit {

  updForm!: FormGroup

  tipSelect: any = [
    {value: 0, name: 'Подписка активна'},
    {value: 1, name: 'Подписка приостановлена'},
    {value: 2, name: 'Подписка заблокирована'},
  ]

  constructor(@Inject(MAT_DIALOG_DATA) public user: UserDialog,
              private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ListUsersComponent>,
              private httpService: HttpService) {
  }

  ngOnInit() {
    this.updForm = new FormGroup(
      {
        fam: new FormControl(''),
        ima: new FormControl(''),
        oth: new FormControl(''),
        status: new FormControl('')

      }
    )
    this.updForm.patchValue({fam: this.user.fname, ima: this.user.name, oth: this.user.mname, status: this.user.status})
  }

  saveUser() {
    let user = new UserUpdate();
    user.id = this.user.id
    user.name = this.updForm.value.ima
    user.fname = this.updForm.value.fam
    user.mname = this.updForm.value.oth
    user.status = this.updForm.value.status

    this.httpService.updateUser(user).subscribe(
      data => {
        this.dialogRef.close()
      }
    ), (error: HttpErrorResponse) => {
      this.snackBar.open(error.message, "x", {
        panelClass: ["red-snackbar"]
      })._dismissAfter(4000)
    }
  }
}

export interface UserDialog {
  id: number
  fname: string
  name: string
  mname: string
  status: number
}


