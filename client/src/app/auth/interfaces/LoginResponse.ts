import { User } from "src/app/interfaces";

export interface LoginResponse {
  accessToken: string,
  refreshToken: string,
  message: string,
  user: User,
  refreshTokenId: string
}