import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification/notification.service';

@Component({
  selector: 'uni-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.notification.listen().subscribe(observe => {
    //   console.log(observe);
    // })
  }


}
