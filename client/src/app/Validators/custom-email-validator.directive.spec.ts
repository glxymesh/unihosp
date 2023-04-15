import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { CustomEmailValidatorDirective } from './custom-email-validator.directive';

describe('CustomEmailValidatorDirective', () => {
  it('should create an instance', () => {
    const directive = new CustomEmailValidatorDirective(new UserService(http: new HttpClient()));
    expect(directive).toBeTruthy();
  });
});
