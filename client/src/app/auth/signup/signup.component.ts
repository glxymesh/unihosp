import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { PassInputField } from '../interfaces/passInputField';
import { AuthService } from '../services/auth.service';

@Component({
  selector: `uni-signup`,
  templateUrl: './signup.component.html',
  styleUrls: [
    './signup.component.scss',
    '../common-styles/common.css',
    '../common-styles/password-field.component.scss',
  ],
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authService: AuthService
  ) { }

  trySubmit = false;

  passInputFields: PassInputField[] = [
    { title: 'Password', classList: 'fa fa-eye', fieldType: 'password' },
    {
      title: 'Confirm-Password',
      classList: 'fa fa-eye',
      fieldType: 'password',
    },
  ];

  hide(index: number) {
    const comparison = this.passInputFields[index].fieldType === 'password';
    this.passInputFields[index].classList = comparison
      ? 'fa fa-eye-slash'
      : 'fa fa-eye';
    this.passInputFields[index].fieldType = comparison ? 'text' : 'password';
  }

  signupForm!: FormGroup;

  passMatch = true;

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  confirmPasswordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  loading = false;

  ngOnInit() {
    document.title = 'Signup - UniHosp';
    this.signupForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\+\d{1,2})-(\d{10})$/),
      ]),
      password: this.passwordControl,
      'confirm-password': this.confirmPasswordControl,
      userType: new FormControl(),
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  userTypeChange(event: any) {
    event.target.value = event.target.checked ? 'Doctor' : 'Patient';
  }

  navigate(email: string, contact: string) {
    this.router
      .navigate([
        '/auth/verify-otp',
      ], {
        state: {
          authData: {
            email,
            contact,
          },
        }
      })
      .then(console.log);
  }

  async handleRegistration($event: any) {
    $event.preventDefault();

    console.log(this.signupForm.value);
    const values = this.signupForm.value;
    console.log(
      this.signupForm.valid,
      this.validatePass(values.password, values['confirm-password'])
    );
    if (
      this.validatePass(values.password, values['confirm-password']) &&
      this.signupForm.valid
    ) {
      this.authService
        .signup(values.email, values.password, values.contact)
        .subscribe((user) => {
          this.navigate(values.email, values.contact);
        });
    } else {
      console.log('Something Went Wrong');
    }
  }

  validatePass(prev: string, curr: string) {
    return prev === curr;
  }
}
