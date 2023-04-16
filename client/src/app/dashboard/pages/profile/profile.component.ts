import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'uni-profile',
  templateUrl: 'profile.component.html',
  styleUrls: [
    'profile.component.scss',
    '../../common.style.scss',
    '../../../auth/common-styles/password-field.component.scss',
  ],
})
export class ProfileComponent implements OnInit {
  constructor(
    private profileService: ProfileService,
    private userService: UserService
  ) { }
  @ViewChild('file') file!: ElementRef<HTMLInputElement>;

  paitentProfile$ = this.profileService.current;
  userService$ = this.userService.currentUser;

  loading = false;

  // editable = false;

  // makeEditable() {
  //   this.editable = true;
  // }

  // cancelEditable() {
  //   this.editable = false;
  // }

  handlePhotoUpload() {
    const formData = new FormData();
    if (!this.file.nativeElement.files) return;
    formData.append('file', this.file.nativeElement.files[0]);
    this.loading = true;
    this.profileService.updateAvatar(formData).subscribe((data) => {
      // console.log(data);
      this.userService.refereshCurrentUser();
      this.loading = false;
    });
  }

  ngOnInit() {
    // this.paitentProfile$.subscribe((patient) => {
    // console.log(patient);
    // });
  }
}
