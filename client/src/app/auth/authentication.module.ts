import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { CustomEmailValidatorDirective } from './Validators/custom-email-validator.directive';
import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationComponent } from "./authentication.component";
import { ForgotComponent } from "./forgot/forgot.component";
import { LoginComponent } from "./login/login.component";
import { OtpComponent } from "./otp/otp.component";
import { ResetPasswordComponent } from "./resetpassword/resetpassword.component";
import UniCookieService from './services/unicookie.service';
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  declarations: [
    ForgotComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    OtpComponent,
    AuthenticationComponent,
    CustomEmailValidatorDirective,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
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
    UniDirectivesModule
  ],
  providers: [
    UniCookieService
  ]
})
export class AuthenticationModule { }
