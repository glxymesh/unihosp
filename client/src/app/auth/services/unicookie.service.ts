import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

interface AStoreType {
  aupl: string,
  asecl: string
  aexpl: string
}

interface RStoreType {
  rupl: string
  rsecl: string
  rexpl: string
}

type CookieName = "aupl" | "ascel" | "aexpl" |
  "rupl" | "rscel" | "rexpl" |
  "uid" | "rid";

@Injectable()
export default class UniCookieService {

  constructor(private cookie: CookieService) { }

  private divideAccessToken(accessToken: string): AStoreType {
    const [aupl, asecl, aexpl] = accessToken.split(".");
    return { aupl, asecl, aexpl }
  }

  private divideRefreshToken(refreshToken: string): RStoreType {
    const [rupl, rsecl, rexpl] = refreshToken.split(".");
    return { rupl, rsecl, rexpl }
  }

  storeAccessToken(payload: string, expire?: number) {
    const cookies = this.divideAccessToken(payload);
    expire = expire || 7200;
    this.cookie.set("aupl", cookies.aupl, expire);
    this.cookie.set("asecl", cookies.asecl, expire);
    this.cookie.set("aexpl", cookies.aexpl, expire);
  }

  store(name: CookieName, payload: string, expire?: number) {
    expire = expire || 2592000;
    this.cookie.set(name, payload, expire);
  }

  getAccessToken() {
    return this.cookie.get("aupl") + this.cookie.get("asecl") + this.cookie.get("aexpl");
  }

  getRefreshToken() {
    return this.cookie.get("rupl") + this.cookie.get("rsecl") + this.cookie.get("rexpl");
  }

  retrieve(name: CookieName) {
    return this.cookie.check(name) ? this.cookie.get(name) : undefined;
  }

  storeRefreshToken(payload: string, expire?: number) {
    const cookies = this.divideRefreshToken(payload);
    expire = expire || 2592000;
    this.cookie.set("rupl", cookies.rupl, expire);
    this.cookie.set("rsecl", cookies.rsecl, expire);
    this.cookie.set("rexpl", cookies.rexpl, expire);
  }

  deleteAllCookie() {
    this.cookie.deleteAll();
  }
}