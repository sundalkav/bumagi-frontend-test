import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from "./modules/login/auth.module";
import {HttpClientModule} from "@angular/common/http";
import {BumagiModule} from "./modules/bumagi/bumagi.module";
import {registerLocaleData} from "@angular/common";
import localeRu from "@angular/common/locales/ru";

registerLocaleData(localeRu)

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    BumagiModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "ru"},
  ],
  bootstrap: [AppComponent],

})
export class AppModule {
}
