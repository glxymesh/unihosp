import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'uni-hospital',
  templateUrl: 'hospital.component.html',
  styleUrls: ["hospital.component.scss", "../../common.style.scss"]
})

export class HospitalComponent implements AfterViewInit, OnInit {


  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

  }

  paitentProfile$ = this.profileService.current;




  ngAfterViewInit() {
  }
}
