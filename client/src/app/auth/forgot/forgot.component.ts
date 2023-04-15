import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'uni-forget',
  templateUrl: 'forgot.component.html',
  styleUrls: ["forgot.component.scss", "../common-styles/common.css", "../common-styles/password-field.component.scss"]
})

export class ForgotComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      "email": ""
    })
  }

  handleForgetMailSent($event: any) {
    $event.preventDefault();

    // this.router.navigate(["/"])
    //   .then(console.log);
  }
}
