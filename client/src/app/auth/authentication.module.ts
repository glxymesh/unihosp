import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthModule } from "@unihosp/auth";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationComponent } from "./authentication.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { LoginComponent } from "./login/login.component";
import { OtpComponent } from "./otp/otp.component";
import { ResetPasswordComponent } from "./resetpassword/resetpassword.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    ForgotComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    OtpComponent,
    AuthenticationComponent,
  ],
  exports: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule,
    AuthenticationRoutingModule,
    BrowserAnimationsModule,
  ]
})
export class AuthenticationModule { }
