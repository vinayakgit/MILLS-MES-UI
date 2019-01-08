import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from './../../../../app/Constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private pushedMenutoTabsSource = new Subject<any>();
  public menuPushedToTabs$ = this.pushedMenutoTabsSource.asObservable();


  constructor(private http: HttpClient, private constants: Constants) { }

  getMenu(): any {
    return this.http.get(this.constants.baseUrl + '/menu/getmenu' );

  }

  pushMenuToTabs(child: any) {
    this.pushedMenutoTabsSource.next(child);
  }
}
