import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {UsersPagesComponent} from "./pages/users-list/users-pages.component";

const routes: Routes = [
  {path: 'users', canActivate: [AuthGuard], component: UsersPagesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BumagiRoutingModule {
}
