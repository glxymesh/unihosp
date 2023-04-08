import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FieldType, HUIcon} from "../interfaces";

@Component({
  selector: 'uni-rsp',
  templateUrl: 'reset-password.component.html',
  styleUrls: ["reset-password.component.scss", "../common-styles/common.css", "../components/password-field.component/password-field.component.scss"]
})

export class ResetPasswordComponent implements OnInit {



  passInputFields: {
    title: string
    classList: HUIcon,
    fieldType:FieldType
  }[] = [
    { title: "New-Password", classList: "fa fa-eye", fieldType: "password" },
    { title: "Confirm-Password", classList: "fa fa-eye", fieldType: "password" }
  ]

  hide(index: number) {
    const comparison = this.passInputFields[index].fieldType === "password";
    this.passInputFields[index].classList =  comparison ? "fa fa-eye-slash" : "fa fa-eye";
    this.passInputFields[index].fieldType = comparison ? "text" : "password";
  }

  constructor(private formBuilder: FormBuilder) { }


  resetForm!: FormGroup;

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      "new-password": ["", [
        Validators.minLength(8)
      ]],
      "confirm-password": ["", [
        Validators.minLength(8)
      ]],

    })

  }
}
