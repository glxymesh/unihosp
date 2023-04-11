import { AbstractControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";

export class EmailValidator {

  static CheckUserName(user: UserService) {
    return (control: AbstractControl) => {
      const email: string = control.value.toLowerCase();
      return 
    }
  }
}