import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationComponent } from "./authentication.component";
import { DirectivesDirective } from './directives/directives.directive';
import { HoverDirective } from './directives/hover.directive';
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
    HoverDirective,
    DirectivesDirective
  ],
  exports: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
