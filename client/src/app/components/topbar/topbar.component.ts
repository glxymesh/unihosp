import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uni-atp',
  templateUrl: 'topbar.component.html',
  styleUrls: ["topbar.component.scss"]
})

export class TopbarComponent implements OnInit {
  constructor() { }

  @Input() searchBar: boolean = false;



  ngOnInit() {


  }
}