import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'uni-hospital',
  templateUrl: 'hospital.component.html',
  styleUrls: ["hospital.component.scss", "../../common.style.scss"]
})

export class HospitalComponent implements AfterViewInit, OnInit {


  constructor(private profileService: ProfileService, private userService: UserService) { }

  userService$ = this.userService.currentUser;


  ngOnInit(): void {

  }

  paitentProfile$ = this.profileService.current;




  ngAfterViewInit() {
  }
}
