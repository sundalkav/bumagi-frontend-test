import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../../login/services/token-storage.service";
import {User} from "../models/user.model";
import {Observable} from "rxjs";
import {UserUpdate} from "../models/user-update";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private httpOptions: { headers: HttpHeaders; } | undefined;

  constructor(private http: HttpClient, private tokenGet: TokenStorageService) {
  }

  getAllUsers(status: number): Observable<User[]> {
    this.getHeaders()
    return this.http.get<User[]>(environment._baseURL + '/users' + this.getUrl(status), this.httpOptions)
  }

  getUrl(status: number): string {
    let st: string = ''
    switch (status) {
      case 2:
        st = '?status=2';
        break;
      case 0:
        st = '?status=0';
        break;
      default:
        st = ''
    }
    return st
  }

  updateUser(user: UserUpdate) {
    this.getHeaders()
    return this.http.patch(environment._baseURL + '/users/' + user.id, {
      "name": user.name,
      "fname": user.fname,
      "mname": user.mname,
      "status": user.status
    }, this.httpOptions);
  }

  getHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.tokenGet.getToken()
      })
    }
  }


}
