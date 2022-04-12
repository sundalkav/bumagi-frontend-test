import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokenStorageService} from '../../login/services/token-storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _authService: TokenStorageService,
              private _router: Router) {
  }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    } else {
      this._router.navigate(['/login'])
      return false
    }
  }
}
