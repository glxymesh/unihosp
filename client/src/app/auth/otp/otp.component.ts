import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'uni-otp',
  templateUrl: 'otp.component.html',
  styleUrls: ["otp.component.scss", "../common-styles/common.css", "../common-styles/password-field.component.scss"]
})

export class OtpComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }


  ngOnInit() {
  }

  handleOTPCheck() {

  }
}
