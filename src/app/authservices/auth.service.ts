import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Interceptor } from './app.interceptor';
import {TokenStorage} from './token.storage';
import {environment} from '../../environments/environment';
import {catchError, tap} from 'rxjs/operators';
import { Person } from '../layout/components/register/register.component';
import {Constants} from '../Constants';


@Injectable(
    //{providedIn:'root'}
)
export class AuthService {

  dat: any;
    constructor(
        private router: Router,
        private http: HttpClient,
        private interceptor: Interceptor,
        private token: TokenStorage,
        private constants: Constants
    ) {}

    attemptAuth(username: string, password: string): Observable<any> {
      this.token.removeToken();
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('Authorization', 'Basic ' + btoa('webapp:1111'));
      httpHeaders = httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
      httpHeaders = httpHeaders.set('Accept', 'application/json');
       return this.http.post( this.constants.baseUrl + '/oauth/token?username=' + username + '&password=' + password + '&grant_type=password', {}, {headers: httpHeaders} );
    }


  //  async checkTokenExpiry() {
  //     const access_token = this.token.getToken();
  //     let httpHeaders = new HttpHeaders();
  //     httpHeaders = httpHeaders.set('Accept', 'application/json');
  //    this.dat = await this.http.post(this.constants.this.constants.baseUrl + '/authserver/oauth/check_token?token=' + access_token, null, {headers: httpHeaders})
  //     .toPromise(
  //     ).then (
  //       data => {console.log('Data :' + this.dat);
  //       return true;
  //     }
  //     ).catch (
  //       (error) => {
  //         console.error('Error: ' + error);
  //       return false;
  //       }
  //     );
  //   }

    getData(filter: string = '', sortBy: string, sortDirection: string, pageIndex: number, pageSize: number): Observable<any> {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('responseType', 'text');
        let params = new HttpParams();
        params = params.set('pageIndex',  pageIndex.toString());
        params = params.set('pageSize', pageSize.toString());
        params = params.set('sortBy', sortBy);
        params = params.set('sortDirection', sortDirection);

        return this.http.get( this.constants.baseUrl + '/user/getusers', {headers: httpHeaders, params: params } )
        .pipe(

        );
    }

    saveData(person: Person): Observable<any> {
      let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('responseType', 'application/json');
      return this.http.post(this.constants.baseUrl + '/user/save', person,{headers: httpHeaders});
    }

    update(persons: Array<Person>) {
      let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.set('responseType', 'application/json');
      return this.http.post(this.constants.baseUrl + '/user/update', persons, {headers: httpHeaders});
    }

    signOut() {
        this.token.signOut();
        this.router.navigateByUrl('/login');
    }
}
