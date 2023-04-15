import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'uni-apo',
  templateUrl: 'appointment.component.html',
  styleUrls: ["appointment.component.scss", "../../common.style.scss"]
})

export class AppointmentComponent implements OnInit {
  paitentProfile$ = this.profileService.current;

  constructor(private profileService: ProfileService) { }

  ngOnInit() { }
}