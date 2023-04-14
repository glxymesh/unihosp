import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './aboutpage/about.component';
import { AuthenticationRoutingModule } from './auth/authentication-routing.module';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { ErrorComponent } from './error/error.component';
import { CreaterpofileGuard } from './guards/createrpofile.guard';
import { LandingPageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: "", pathMatch: "full", component: LandingPageComponent },
  { path: 'createprofile', canActivate: [CreaterpofileGuard], component: CreateprofileComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    DashboardRoutingModule,
    AuthenticationRoutingModule,
  ]
})
export class AppRoutingModule { }
