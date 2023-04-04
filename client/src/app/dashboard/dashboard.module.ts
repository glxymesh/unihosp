import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from '@angular/router';

import { TopbarComponent } from './components/topbar/topbar.component';
import { DashboardComponent } from './dashboard.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DocumentComponent } from './pages/document/document.component';
import { HomeComponent } from './pages/home/home.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'hospital', component: HospitalComponent },
      { path: 'appointments', component: AppointmentComponent },
      { path: 'documents', component: DocumentComponent },
    ],
  },
]

@NgModule({
  declarations: [
    DashboardComponent,
    TopbarComponent,
    HomeComponent,
    ProfileComponent,
    HospitalComponent,
    AppointmentComponent,
    DocumentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class DashboardModule { }
