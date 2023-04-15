import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'uni-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.scss', "../../auth/common-styles/password-field.component.scss"]
})
export class AddDocumentsComponent implements OnInit {

  addDocumentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  open = true;

  close() {

  }

  ngOnInit(): void {
    this.addDocumentForm = this.formBuilder.group({
      filename: ['', [Validators.required]],
      file: ['', [Validators.required]]
    })
  }
}
