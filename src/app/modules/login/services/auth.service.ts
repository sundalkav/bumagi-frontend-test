import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from '../models/login-info';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo) {
    return this.http.post(environment._baseURL + '/auth', credentials, {observe: 'response'});
  }

}
