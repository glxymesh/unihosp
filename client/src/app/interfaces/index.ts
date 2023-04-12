export * from "./appConfig";
export * from "./appointment";
/**
 * Model User
 * 
 */
export type User = {
  id: string
  email: string
  password: string
  name: string | null
  contact: string | null
  role: Role
  createdAt: Date
  updatedAt: Date | null
  verified: boolean
}

/**
 * Model RefreshTokens
 * 
 */
export type RefreshTokens = {
  id: string
  userId: string
  authToken: string
  expireIn: Date
  createdAt: Date
}

/**
 * Model Hospital
 * 
 */
export type Hospital = {
  id: string
  name: string
  handle: string
  location: string | null
  createdAt: Date
  updatedAt: Date | null
}

/**
 * Model Patient
 * 
 */
export type Patient = {
  id: string
  handle: string
  createdAt: Date
  updatedAt: Date | null
  userId: string
}

/**
 * Model Doctor
 * 
 */
export type Doctor = {
  id: string
  handle: string
  hospitalId: string
  createdAt: Date
  updatedAt: Date | null
  userId: string
}

/**
 * Model Documents
 * 
 */
export type Documents = {
  id: string
  name: string
  type: string
  buffer: ArrayBuffer[]
  userId: string
  createdAt: Date
  updatedAt: Date | null
}

/**
 * Model Appointments
 * 
 */
// export type Appointments = {
//   id: string
//   appointmentDate: Date
//   patientId: string
//   doctorId: string
//   hospitalId: string
//   location: string
//   createdAt: Date
//   updatedAt: Date | null
// }

/**
 * Model Preferences
 * 
 */
export type Preferences = {
  id: string
  userId: string
  notificationAllowed: boolean
  createdAt: Date
  updatedAt: Date | null
}

/**
 * Model Notification
 * 
 */
export type Notification = {
  id: string
  title: string
  description: string
  createAt: Date
  userId: string
  redirectUrl: string | null
  checked: boolean
  createdAt: Date
  updatedAt: Date | null
}

/**
 * Model VerificationMailRequest
 * 
 */
export type VerificationMailRequest = {
  id: string
  email: string
  contact: string
  code: number
  expireAt: Date
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const Role = {
  Patient: 'Patient',
  Doctor: 'Doctor',
  Admin: 'Admin'
};

export type Role = (typeof Role)[keyof typeof Role]
