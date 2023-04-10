import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {animate, group, query, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'uni-auth',
  templateUrl: 'authentication.component.html',
  styleUrls: [ "authentication.component.scss"],
  animations: [
    trigger("routerAnimation", [
      transition("* => reset", [
        query(":enter, :leave", [
          style({
            // position: 'absolute',
            display: "flex",
          })
        ], { optional: true }),
      ]),
      transition("* => *", [
        query(":enter, :leave", [
          style({
            position: 'absolute',
          })
        ], { optional: true }),
        group([
          query(":leave", [
            animate("200ms ease-in", style({
              opacity: 0,
              transform: "translateX(-100%)"
            }))
          ], {optional: true}),
          query(":enter", [
            style({
              transform: "translate(100%)",
              opacity: 0
            }),
            animate("500ms 200ms ease", style({
              opacity: 1,
              transform: "translate(0px)"
            }),)
          ], { optional: true }),
        ])
      ])
    ])
  ]
})

export class AuthenticationComponent implements OnInit {
  constructor() {
  }

  switchPage(outlet: RouterOutlet) {
    if(outlet.isActivated)
      return outlet.activatedRoute.snapshot.url;
    return null
  }

  ngOnInit() {
  }
}
