import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthenticationRoutingModule } from './auth/authentication-routing.module';
import { AppComponent } from './app.component';
import {AuthenticationModule} from "./auth/authentication.module";
import {AuthenticationComponent} from "./auth/authentication.component";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
