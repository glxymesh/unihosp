import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ForgotComponent} from "./forgot/forgot.component";
import {ResetPasswordComponent} from "./resetpassword/resetpassword.component";
import {OtpComponent} from "./otp/otp.component";

const routes: Routes = [
  {
    path: "auth", children: [
      { path: "signup", component: SignupComponent },
      { path: "login", component: LoginComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      { path: "forgot-password", component: ForgotComponent },
      { path: "verify-otp", component: OtpComponent, }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
