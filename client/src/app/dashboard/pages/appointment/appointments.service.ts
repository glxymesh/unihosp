import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointments } from 'src/app/interfaces';



@Injectable()
export class AppointmentService {

  private appointments$ = new BehaviorSubject<Appointments[]>([]);

  constructor() { }

  get appointments() {
    return this.appointments$;
  }

  count = 0;

  requestAppointments() {
    console.log("Requested: ", this.count);
    this.appointments$.next([
      { title: "Dr. Neelima Deshmukh", description: "Manak Hospital Indore", dateTime: new Date(), userIcon: "/assets/doctor1.jpg" },
      { title: "Dr. Kushagra Jain", description: "MY Hospital Indore", dateTime: new Date(), userIcon: "/assets/doctor2.png" },
    ]);
    this.count++;
  }

}