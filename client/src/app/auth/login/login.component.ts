import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { FieldType, HUIcon } from '../interfaces';

@Component({
  selector: 'uni-login',
  templateUrl: 'login.component.html',
  styleUrls: ["login.component.scss", "../common-styles/common.css", "../common-styles/password-field.component.scss"]
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  fieldType: FieldType = 'password';
  classList: HUIcon = 'fa fa-eye';

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "email": "",
      "password": ""
    })
  }

  hide() {
    const comparison = this.fieldType === "password";
    this.classList = comparison ? "fa fa-eye-slash" : "fa fa-eye";
    this.fieldType = comparison ? "text" : "password";
  }

  login($event: any) {
    $event.preventDefault();

    this.router.navigate(["/"])
      .then(console.log);
  }
}
