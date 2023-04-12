export type Role = 'Paitent' | 'Doctor' | 'Admin';


export interface User {
  id: string
  email: string
  password: string
  name: string | null
  role: Role
  createdAt: Date
  updatedAt: Date | null
}