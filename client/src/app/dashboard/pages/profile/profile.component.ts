import { Component, OnInit } from '@angular/core';
import { Doctor, Patient } from 'src/app/interfaces';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'uni-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ["profile.component.scss", "../../common.style.scss"]
})

export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) { }

  paitentProfile$ = this.profileService.current;

  ngOnInit() {
    this.paitentProfile$.subscribe((patient) => {
      console.log(patient)
    })
  }
}