import { AbstractControl, FormControl } from "@angular/forms";
import { debounce, debounceTime, map, take } from "rxjs";
import { UserService } from "src/app/services/user.service";

export class EmailValidator {

  static CheckUserName(user: UserService) {
    return (control: AbstractControl) => {
      const email: string = control.value.toLowerCase();
      // console.log(email)
      const val = user.getUsersByMail(email).pipe(map(val => val.email ? null : val.email))
      return val
    }
  }
}