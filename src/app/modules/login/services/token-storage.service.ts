import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }

  loggedIn() {
    return !!sessionStorage.getItem(TOKEN_KEY)
  }
}
