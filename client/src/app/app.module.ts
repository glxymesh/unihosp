import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { ValidatorsModule } from './Validators/validators.module';
import { AboutComponent } from './aboutpage/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './auth/authentication.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ErrorComponent } from './error/error.component';
import { LandingPageComponent } from './landingpage/landingpage.component';
import { LoadingModule } from './loading/loading.module';
import { NotificationService } from './notification/notification.service';
import { RequestsInterceptor } from './requests.interceptor';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CreateprofileComponent,
    LandingPageComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    TopbarModule,
    SidebarModule,
    HttpClientModule,
    AuthenticationModule,
    ReactiveFormsModule,
    FormsModule,
    UniDirectivesModule,
    LoadingModule,
    ValidatorsModule,
    RouterModule
  ],
  providers: [
    NotificationService,
    ProfileService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
