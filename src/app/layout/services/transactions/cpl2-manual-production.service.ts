import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../Constants';
import { TokenStorage } from '../../../authServices/token.storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Cpl2ManualProductionService {

  constructor(
    private http: HttpClient,
    private constants: Constants,
    private tokenStorage: TokenStorage
  ) { }


  getUnits(): Observable<any> {
    let url: string = this.constants.baseUrl;
    url = url.concat('/cpl2prodctrl/getunits?user=');
    url = url.concat(this.tokenStorage.getCurrentUser());
     url = url.concat('&projection=attributesonly');
    return this.http.get(url);
  }


  getBatches(subunitid: number, screenid: number): Observable<any> {
    let url: string = this.constants.baseUrl;
    url = url.concat('/cpl2prodctrl/getbatches?');
    url = url.concat('subUnitId=' + subunitid);
    url = url.concat('&screenid=' + screenid);
    url = url.concat('&projection=trnsBatchDetailsForcpl2manual');
    return this.http.get(url);
  }
}
