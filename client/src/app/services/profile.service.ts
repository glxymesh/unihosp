import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { BloodGroupType, Patient, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
    this.http.get<Patient>("/patient/user").subscribe((patient) => {
      this.currentProfile.next(patient);
    })
  }

  private currentProfile = new BehaviorSubject<Patient | null>(null);

  get current() {
    return this.currentProfile;
  }

  set profile(profile: Patient) {
    this.currentProfile.next(profile)
  }

  checkHandle(handle: string) {
    return this.http.post<{ handle: boolean }>(`/patient/exists`, {
      handle
    })
  }

  updateAvatar(formData: FormData) {
    return this.http.post("/avatars", formData);
  }

  createPatientProfile({ fName, lName, dateOfBirth, handle, bloodGroup }: {
    fName: string,
    lName: string,
    dateOfBirth: string | Date,
    handle?: string,
    bloodGroup: BloodGroupType
  }) {

    const patient = this.http.post<Patient>(`/patient`, {
      fName,
      lName,
      dateOfBirth,
      handle,
      bloodGroup
    });

    patient.subscribe(patient => {
      console.log(patient);
      this.currentProfile.next(patient);
    })
    return patient;
  }
}
