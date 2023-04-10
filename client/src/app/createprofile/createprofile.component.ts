import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'uni-createprofile',
  templateUrl: './createprofile.component.html',
  styleUrls: ['./createprofile.component.scss', "../auth/common-styles/password-field.component.scss"]
})
export class CreateprofileComponent implements OnInit {
  predefinedSuffix = "@unihosp";

  createProfileForm!: FormGroup;

  bloodTypes = ['A', 'B', 'AB', 'O'];

  focused = [false, false, false, false, false];

  maxDate = new Date();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createProfileForm = this.formBuilder.group({
      'firstname': "",
      'lastname': "",
      'handle': "",
      'dateOfBirth': "",
      'bloodGroup': ""
    });
  }

  onFocus(index: number) {
    this.focused[index] = true;
  }

  onBlur(index: number) {
    this.focused[index] = false;
  }

  handleFormSubmission() {

  }
}
