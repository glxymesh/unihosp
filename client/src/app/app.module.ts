import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from '@unihosp/auth';
import { AboutComponent } from './aboutpage/about.component';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './auth/authentication.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationService } from './notification/notification.service';



const routes: Routes = [
  { path: "createprofile", canActivate: [], component: CreateprofileComponent },
  { path: "about", component: AboutComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CreateprofileComponent,
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    TopbarModule,
    SidebarModule,
    AuthenticationModule,
    AuthModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
