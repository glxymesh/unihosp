import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import UniCookieService from 'src/app/services/unicookie.service';
import { AuthService } from '../../services/auth.service';
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
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      "email": [
        "", [
          Validators.required,
          Validators.email
        ]
      ],
      "password": ['',
        Validators.required
      ]
    })
  }

  get email() {
    return this.loginForm.get('email');
  }


  hide() {
    const comparison = this.fieldType === "password";
    this.classList = comparison ? "fa fa-eye-slash" : "fa fa-eye";
    this.fieldType = comparison ? "text" : "password";
  }

  login($event: any) {
    $event.preventDefault();
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.loading = true;
      this.authService.login(formValue['email'], formValue['password']).subscribe((data) => {
        this.loading = false;

      })
    }
  }
}
