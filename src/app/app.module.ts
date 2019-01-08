import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OverlayModule} from '@angular/cdk/overlay';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {HttpModule} from '@angular/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import {AuthGuardService} from './authServices/auth-guard.service';
import {AuthService} from './authServices/auth.service';
import {TokenStorage} from './authServices/token.storage';
import {Interceptor} from './authServices/app.interceptor';
import { MatCardModule,
   MatToolbarModule,
   MatInputModule,
   MatButtonModule,
   MatTooltipModule,
   MatIconModule,
   MatSelectModule,
   MatDialogModule
   } from '@angular/material';
import {CarouselModule} from 'ngx-bootstrap';
import { MenuService } from './layout/components/menu/menu.service';
import { Constants } from './Constants';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule, MatDialogModule,
  FormsModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  CarouselModule,
  MatTooltipModule,
  HttpClientModule, MatSelectModule,
  HttpModule,
  OverlayModule
  ],
  providers: [
    AuthService, TokenStorage, Constants,
    {provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}

    ],
  bootstrap: [AppComponent]
})
export class AppModule {  }
