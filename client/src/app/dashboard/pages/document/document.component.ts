import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'uni-doc',
  templateUrl: 'document.component.html',
  styleUrls: ["document.component.scss", "../../common.style.scss"]
})

export class DocumentComponent implements OnInit {

  paitentProfile$ = this.profileService.current;

  constructor(private profileService: ProfileService) { }

  ngOnInit() { }
}