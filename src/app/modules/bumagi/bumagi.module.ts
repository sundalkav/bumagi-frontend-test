import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListUsersComponent} from "./components/list-users/list-users.component";
import {StatusTextPipe} from "./pipes/status-text.pipe";
import {DialogUpdateUserComponent} from "./components/dialog-update-user/dialog-update-user";
import {AuthGuard} from "./guards/auth.guard";
import {BumagiRoutingModule} from "./bumagi-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MenuComponent} from './components/menu/menu.component';
import {UsersPagesComponent} from './pages/users-list/users-pages.component';

@NgModule({
  declarations: [
    ListUsersComponent,
    StatusTextPipe,
    DialogUpdateUserComponent,
    MenuComponent,
    UsersPagesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    BumagiRoutingModule
  ],
  providers: [AuthGuard],
  entryComponents: [DialogUpdateUserComponent]
})
export class BumagiModule {
}
