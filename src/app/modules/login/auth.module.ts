import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./components/auth.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule {
}
