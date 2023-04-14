import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginGuard } from "../guards/login.guard";
import { UserGuard } from "../guards/user.guard";
import { DashboardComponent } from "./dashboard.component";
import { AppointmentComponent } from "./pages/appointment/appointment.component";
import { DocumentComponent } from "./pages/document/document.component";
import { HomeComponent } from "./pages/home/home.component";
import { HospitalComponent } from "./pages/hospital/hospital.component";
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: 'dashboard',
    canActivateChild: [UserGuard],
    canLoad: [LoginGuard, UserGuard],
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'hospital', component: HospitalComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path: 'documents', component: DocumentComponent },
      { path: 'hospitals', component: HospitalComponent },
    ],
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {

}