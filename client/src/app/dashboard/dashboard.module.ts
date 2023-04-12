import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { AddAppointmentModule } from '../components/add-appointment/add-appointment.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';
import { TopbarModule } from '../components/topbar/topbar.module';
import { UserGuard } from '../guards/user.guard';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { AppointmentService } from './pages/appointment/appointments.service';
import { DocumentComponent } from './pages/document/document.component';
import { HomeComponent } from './pages/home/home.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { ProfileComponent } from './pages/profile/profile.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ProfileComponent,
    HospitalComponent,
    AppointmentComponent,
    DocumentComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DashboardRoutingModule,
    TopbarModule,
    SidebarModule,
    AddAppointmentModule,
    UniDirectivesModule
  ],
  exports: [
    DashboardComponent
  ],
  providers: [
    AppointmentService,
    UserGuard
  ]
})
export class DashboardModule { }
