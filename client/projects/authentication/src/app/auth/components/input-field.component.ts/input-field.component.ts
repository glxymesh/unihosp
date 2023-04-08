import {Component, Input, OnInit} from '@angular/core';
import {FormControlName} from "@angular/forms";

@Component({
  selector: 'input-field',
  templateUrl: 'input-field.component.html',
  styleUrls: ["input-field.component.scss"]
})

export class InputFieldComponent implements OnInit {

  @Input("formControlName") formControlName!: string;
  @Input("placeHolder") placeHolder!: string;
  @Input("title") title!: string;
  @Input("icon") icon!: string;
  @Input("id") id!: string;

  constructor() {
  }

  ngOnInit() {
  }
}
