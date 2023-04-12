import { InjectionToken } from "@angular/core";
import { AppConfig } from "../interfaces";

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')

export const APP_CONFIG: AppConfig = {
  apiEndPoint: 'http://localhost:3000'
}