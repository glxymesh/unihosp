import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'uni-sde',
  templateUrl: 'sidebar.component.html',
  styleUrls: ["sidebar.component.scss"],
  animations: [
    trigger('hideHider', [
      state('show', style({
        opacity: 1,
        filter: 'blur(5px)'
      })),
      state('hide', style({
        opacity: 0,
        filter: 'blur(0px)',
        "z-index": -1
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in')),
    ])
  ]
})

export class SidebarComponent {

  open = false;
  hideHider = false;

  constructor() { }

  routes = [
    { routerLink: "", title: "Home", icon: "fa-house", hovered: false },
    { routerLink: "profile", title: "Profile", icon: "fa-user", hovered: false },
    { routerLink: "documents", title: "Documents", icon: "fa-file", hovered: false },
    { routerLink: "hospital", title: "Hospitals", icon: "fa-hospital", hovered: false },
    { routerLink: "appointments", title: "Appointments", icon: "fa-calendar", hovered: false },
    { routerLink: "settings", title: "Settings", icon: "fa-gear", hovered: false },
  ];

  mouseOver(index: number) {
    this.routes[index].hovered = true;
  }

  mouseOverOut(index: number) {
    this.routes[index].hovered = false;
  }

  get stateName() {
    return this.open ? 'show' : 'hide';
  }

  closeSidebar() {
    console.log("Clicked");

    this.open = false;
    setTimeout(this.hideHiderHandle, 600);
  }


  hideHiderHandle() {
    this.hideHider = false;
  }

  openSidebar(event: any) {
    event.preventDefault();
    this.open = true;
    this.hideHider = true;
  }
}