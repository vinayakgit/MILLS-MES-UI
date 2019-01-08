import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse, HttpEvent,HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import {map, tap} from 'rxjs/operators';


@Injectable({providedIn:'root'})
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq;
    if (this.token.getToken() != null) {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('Authorization', 'Basic ' + btoa('webapp:1111'));
      httpHeaders = httpHeaders.set('Accept', 'application/json');
      if ((req.url.indexOf('/oauth/token') >= 0 ) || (req.url.indexOf('/oauth/check_token') >= 0)) {
        httpHeaders = httpHeaders.set('Content-Type', 'application/x-www-form-urlencoded');
        authReq = req.clone({headers: httpHeaders});
      } else {
        let params = req.params;
        params = params.append('access_token', this.token.getToken());
        authReq = req.clone({headers: httpHeaders, params: params});
      }

      return next.handle(authReq);
      // return next.handle(authReq).pipe(
      //   tap(
      //     event => ok = event instanceof HttpResponse ? this.router.navigateByUrl('/login') : ''
      //     event => ok = 'failed';
      //   )
      // );
    } else {
      return next.handle(req);

    }
  }
}
