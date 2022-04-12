import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {User} from "../../models/user.model";
import {UserUpdate} from "../../models/user-update";


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  providers: [HttpService]
})
export class ListUsersComponent {

  @Input() users!: User[]
  @Input() loader?: boolean
  @Input() idStatus!: number
  @Output() onUpdateUser: EventEmitter<UserUpdate> = new EventEmitter<UserUpdate>();


  updateUser(id: number, fname: string, name: string, mname: string, status: number) {
    const user: UserUpdate = {
      fname: fname, id: id, mname: mname, name: name, status: status
    }

    this.onUpdateUser.emit(user)
  }


}
