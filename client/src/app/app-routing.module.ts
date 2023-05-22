import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './aboutpage/about.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { LoggedInGuard } from './auth/guards/logged.guard';
import { LoginComponent } from './auth/login/login.component';
import { OtpComponent } from './auth/otp/otp.component';
import { ResetPasswordComponent } from './auth/resetpassword/resetpassword.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AddDocumentsComponent } from './components/add-documents/add-documents.component';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { AppointmentComponent } from './dashboard/pages/appointment/appointment.component';
import { DocumentComponent } from './dashboard/pages/document/document.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { HospitalComponent } from './dashboard/pages/hospital/hospital.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { CreaterpofileGuard } from './guards/createrpofile.guard';
import { LandingPageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  {
    path: 'auth',
    component: AuthenticationComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
      {
        path: 'signup',
        canActivate: [LoggedInGuard],
        component: SignupComponent
      },
      {
        path: 'login',
        canActivate: [LoggedInGuard],
        component: LoginComponent
      },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'forgot-password', component: ForgotComponent },
      { path: 'v/:id', component: OtpComponent },
      { path: 'v', redirectTo: '/auth/login' },
    ],
  },
  { path: "addDocs", component: AddDocumentsComponent },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard],
    canActivateChild: [DashboardGuard],
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'hospital', component: HospitalComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path: 'history', component: DocumentComponent },
      { path: 'hospitals', component: HospitalComponent },
      { path: "record/addDocs", component: AddDocumentsComponent },
    ],
  },
  {
    path: 'createprofile',
    canActivate: [CreaterpofileGuard],
    component: CreateprofileComponent,
  },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
