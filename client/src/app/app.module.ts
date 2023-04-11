import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './aboutpage/about.component';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './auth/authentication.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { NotificationService } from './notification/notification.service';
import { RequestsInterceptor } from "./requests.interceptor";
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';



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
    HttpClientModule,
    AuthenticationModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [NotificationService, ProfileService, UserService, RequestsInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
