import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { OutletContext, Router, RouterOutlet, UrlSegment } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'uni-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('routerAnimation', [
      //   transition('* => *', [
      //     style({
      //       background: 'blue'
      //     }),
      //     animate(1000)
      //   ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.currentUser.subscribe(user => {
    //   if (!user) {
    //     this.router.navigate(['/auth/signup'])
    //   }
    // })
  }

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated)
      return outlet.activatedRoute.snapshot.url;
    return null
  }
}
