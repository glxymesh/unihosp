import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { UniDirectivesModule } from 'src/app/directives/unidirectives.module';
import { AboutComponent } from './aboutpage/about.component';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './auth/authentication.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { TopbarModule } from './components/topbar/topbar.module';
import { APP_CONFIG, APP_SERVICE_CONFIG } from './config/app.config';
import { CreateprofileComponent } from './createprofile/createprofile.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HoverDirective } from './directives/hover.directive';
import { NotificationService } from './notification/notification.service';
import { RequestsInterceptor } from './requests.interceptor';
import { ProfileService } from './services/profile.service';
import { UserService } from './services/user.service';

const routes: Routes = [
  { path: 'createprofile', canActivate: [], component: CreateprofileComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [AppComponent, AboutComponent, CreateprofileComponent],
  imports: [
    BrowserModule,
    DashboardModule,
    TopbarModule,
    SidebarModule,
    HttpClientModule,
    AuthenticationModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule,
    UniDirectivesModule,
  ],
  providers: [
    NotificationService,
    ProfileService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
    {
      provide: APP_SERVICE_CONFIG,
      useValue: APP_CONFIG,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
