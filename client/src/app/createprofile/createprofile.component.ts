import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

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

  loading = false;

  trySubmit = false;

  constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
    document.title = "Profile - UniHosp"

    this.createProfileForm = this.formBuilder.group({
      'firstname': ['', [Validators.required]],
      'lastname': ['', [Validators.required]],
      'handle': "",
      'dateOfBirth': ['', [Validators.required]],
      'bloodGroup': ['', Validators.maxLength(2)]
    });

    this.createProfileForm.valueChanges.subscribe((v) => console.log(this.createProfileForm.valid))
  }

  onFocus(index: number) {
    this.focused[index] = true;
  }

  onBlur(index: number) {
    this.focused[index] = false;
  }

  get handle() {
    return this.createProfileForm.get('handle')
  }

  handleFormSubmission($event: any) {
    $event.preventDefault()
    this.trySubmit = true;
    // console.log(this.handle);
    const value = this.createProfileForm.value;
    if (this.createProfileForm.valid) {
      this.loading = true;
      this.profileService.createPatientProfile({ ...value, handle: value['handle'] + this.predefinedSuffix, fName: value['firstname'], lName: value['lastname'] })
        .subscribe((profile) => {
          // console.log(profile);
          this.loading = false;
          this.router.navigate(['/dashboard'])
        })
    }
  }
}
