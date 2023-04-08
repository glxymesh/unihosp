import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'uni-login',
  templateUrl: 'login.component.html',
  styleUrls: ["login.component.scss", "../common-styles/common.css"]
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "email": "",
      "password": ""
    })
  }

  login($event: any) {
    $event.preventDefault();

    this.router.navigate(["/"])
      .then(console.log);
  }
}
