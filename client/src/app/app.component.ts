import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { NotificationService } from './notification/notification.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'uni-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  value = ""

  exists = false


  ngOnInit(): void {

  }

  onChange() {
    console.log(this.value)
    this.userService.getUsersByMail(this.value).subscribe(observe => {
      console.log(observe);
    })
  }


}
