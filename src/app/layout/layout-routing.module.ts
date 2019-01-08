import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { PageoneComponent } from './components/pageone/pageone.component';
import { BlankPageComponent } from './components/blank-page/blank-page.component';
import { AuthGuardService } from '../authServices/auth-guard.service';
import { Cpl2ManualProductionComponent } from './components/transactions/cpl2-manual-production/cpl2-manual-production.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'blank' },
            { path: 'blank', component: BlankPageComponent, canActivate: [AuthGuardService]},
            { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
            { path: 'register/:screenid', component:  RegisterComponent, canActivate: [AuthGuardService] },
            { path: 'pageone/:screenid', component: PageoneComponent, canActivate: [AuthGuardService]},
            { path: 'cpl2mnprod/:screenid', component: Cpl2ManualProductionComponent, canActivate: [AuthGuardService]}

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
