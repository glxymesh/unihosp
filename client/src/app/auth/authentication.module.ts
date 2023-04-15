import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { RouterModule } from '@angular/router';
import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { ValidatorsModule } from '../Validators/validators.module';
import { LoadingModule } from '../loading/loading.module';
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
    BrowserAnimationsModule,
    UniDirectivesModule,
    LoadingModule,
    ValidatorsModule,
    RouterModule
  ],
  providers: [
  ]
})
export class AuthenticationModule { }
