import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {TokenStorage} from './token.storage';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { Constants } from '../Constants';
@Injectable({
  providedIn: 'root'
})


export class AuthGuardService {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private token: TokenStorage,
  private constants: Constants) { }
    baseUrl = this.constants.baseUrl;
    dat: any;
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const access_token = this.token.getToken();
    let isAuthorized = false;
    if (access_token != null) {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('Accept', 'application/json');
    this.dat = await this.http.post(this.baseUrl + '/oauth/check_token?token=' + access_token, null, {headers: httpHeaders})
      .toPromise(
      ).then (
        response => {
        console.log('session validated!');
        isAuthorized = true;
        this.token.saveUser(response);
      }
      ).catch (
        (error) => {
          console.error('Error: ' + error);
          if (error.status === 400) {
            console.error('Session Timed Out..redirecting to Login Page...');
            this.router.navigateByUrl('login');
          }
          isAuthorized = false;
        }
      );

      return isAuthorized;
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
