import { Injectable } from '@angular/core';


const TOKEN_KEY = 'access_token';

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public removeToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  public saveUser(obj: any) {
    window.sessionStorage.setItem('USERNAME', obj.user_name);
  }

  public getCurrentUser() {
    return window.sessionStorage.getItem('USERNAME');
  }
}
