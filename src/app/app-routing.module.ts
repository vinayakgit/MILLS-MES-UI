import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './authServices/auth-guard.service';
import { LayoutModule } from './layout/layout.module';
const routes: Routes = [
	  { path: 'login', component: LoginComponent},
		{ path: '' , loadChildren: './layout/layout.module#LayoutModule'}

	];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {

 }
