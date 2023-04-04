import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { OutletContext, RouterOutlet, UrlSegment } from '@angular/router';

@Component({
  selector: 'uni-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('routerAnimation', [
      transition('* => *', [
        style({
          background: 'blue'
        }),
        animate(1000)
      ])
    ])
  ]
})
export class DashboardComponent {

  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated)
      return outlet.activatedRoute.snapshot.url;
    return null
  }
}
