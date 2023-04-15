import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { Appointments } from 'src/app/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { AppointmentService } from '../appointment/appointments.service';

@Component({
  selector: 'uni-home',
  templateUrl: 'home.component.html',
  styleUrls: ["home.component.scss", "../../common.style.scss"]
})

export class HomeComponent implements OnInit {

  dt = new Date();

  lastTwoAppointments$ = this.appointmentService.appointments.pipe(
    catchError((err) => {
      console.log(err);
      return of([]);
    })
  );

  paitentProfile$ = this.profileService.current;


  constructor(private profileService: ProfileService, private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.requestAppointments();
  }
}