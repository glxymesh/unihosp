import { User } from "./User";

export interface LoginResponse {
  accessToken: string,
  refreshToken: string,
  message: string,
  user: User,
  refreshTokenId: string
}