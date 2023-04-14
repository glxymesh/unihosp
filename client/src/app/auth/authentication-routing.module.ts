import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { ForgotComponent } from "./forgot/forgot.component";
import { LoggedInGuard } from './guards/logged.guard';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from "./otp/otp.component";
import { ResetPasswordComponent } from "./resetpassword/resetpassword.component";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: "auth", component: AuthenticationComponent, children: [
      { path: "", pathMatch: 'full', redirectTo: "/auth/login" },
      { path: "signup", canActivate: [LoggedInGuard], component: SignupComponent },
      { path: "login", canActivate: [LoggedInGuard], component: LoginComponent },
      { path: "reset-password", component: ResetPasswordComponent },
      { path: "forgot-password", component: ForgotComponent },
      { path: "v/:id", component: OtpComponent, },
      { path: "v", redirectTo: '/auth/login' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
