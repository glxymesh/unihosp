import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@unihosp/auth";
import { FieldType, HUIcon } from "../interfaces";


@Component({
  selector: `uni-signup`,
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss", "../common-styles/common.css", "../common-styles/password-field.component.scss"]
})
export class SignupComponent implements OnInit {


  passInputFields: {
    title: string
    classList: HUIcon,
    fieldType: FieldType
  }[] = [
      { title: "Password", classList: "fa fa-eye", fieldType: "password" },
      { title: "Confirm-Password", classList: "fa fa-eye", fieldType: "password" }
    ]

  hide(index: number) {
    const comparison = this.passInputFields[index].fieldType === "password";
    this.passInputFields[index].classList = comparison ? "fa fa-eye-slash" : "fa fa-eye";
    this.passInputFields[index].fieldType = comparison ? "text" : "password";
  }

  signupForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }
  passwordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
  ]);

  confirmPasswordControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ]);
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      "email": new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      "contact": new FormControl("", [
        Validators.required,
        Validators.pattern(/^(\+\d{1,2})-(\d{10})$/)
      ]),
      "password": this.passwordControl,
      "confirm-password": this.confirmPasswordControl,
      "userType": new FormControl()
    });
    this.signupForm.valueChanges.subscribe((observe) => {
      console.log("Form is ", observe);
      console.log(this.signupForm);
    })
  }

  userTypeChange(event: any) {
    event.target.value = event.target.checked ? 'Doctor' : 'Patient';
  }

  navigate(email: string, contact: string) {
    this.router.navigate(["/verify-otp", {
      email,
      contact
    }])
      .then(console.log);
  }

  async handleRegistration($event: any) {
    $event.preventDefault();
    console.log(this.signupForm.value);
    const values = this.signupForm.value;
    if (values.password === values["confirm-password"]) {
      this.authService.signup(values.email, values.password).subscribe((user) => {
        this.navigate(values.email, values.contact,);
      });
    } else {
      alert(`Password's doesn't match.`);
    }
  }

}
