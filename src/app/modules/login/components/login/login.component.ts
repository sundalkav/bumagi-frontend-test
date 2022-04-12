import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";
import {AuthLoginInfo} from "../../models/login-info";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginFailed = false;

  @ViewChild('inputElement') inputElement: ElementRef | undefined;
  form: any = {};
  private loginInfo: AuthLoginInfo | undefined;
  loader: boolean = false

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private mainRouter: Router) {
  }

  ngOnInit(): void {

  }

  showPassword() {
    if (this.inputElement?.nativeElement.type == 'password') {
      this.inputElement.nativeElement.setAttribute('type', 'text')
    } else {
      this.inputElement?.nativeElement.setAttribute('type', 'password')
    }

  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.login,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.loader = true
        let token = data.headers.get("Authorization")
        if (token)
          this.tokenStorage.saveToken(token);
        this.mainRouter.navigate(['/users/']);

      },
      error => {
        this.loader = false;
        this.isLoginFailed = true;
      }
    );
  }


}
