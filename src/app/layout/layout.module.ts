import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "../home/home.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LayoutComponent } from './layout.component';
import {MatDialogModule} from '@angular/material/dialog';
import { LayoutRoutingModule } from "./layout-routing.module";
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatSidenavModule,
   MatToolbarModule, MatCardModule,
   MatListModule, MatFormFieldModule,
   MatInputModule, MatTableModule,
   MatButtonModule, MatGridListModule,
   MatIconModule, MatCheckboxModule, MatSnackBarModule,
   MatPaginatorModule, MatRadioModule,
   MatSortModule, MatTabsModule, MatSlideToggleModule, MatSelectModule, MatButtonToggleModule, MatExpansionModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { PageoneComponent } from './components/pageone/pageone.component';
import { NavMenuComponent } from './components/menu/nav-menu/nav-menu.component';
import { MenuItemsComponent } from './components/menu/menu-items/menu-items.component';
import { MenuService } from './components/menu/menu.service';
import { Constants } from '../Constants';
import { BlankPageComponent } from './components/blank-page/blank-page.component';
import { Report1Component } from './components/reports/report1/report1.component';
import { Cpl2ManualProductionComponent } from './components/transactions/cpl2-manual-production/cpl2-manual-production.component';

import { Cpl2ManualProductionService } from "./services/transactions/cpl2-manual-production.service";
import { ExcelService } from "../excel.service";

import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { CustomDecimalPlaceNumberDirective } from "../directives/CustomDecimalPlaceNumberDirective.directive";




const routs: Routes = [
  {path: '', component: LayoutComponent}
];


@NgModule({
  imports: [
    MatFormFieldModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,    
    MatSelectModule,MatTabsModule,
    MatCheckboxModule,
    CommonModule,MatDialogModule,
    LayoutRoutingModule,MatSlideToggleModule,MatButtonToggleModule,MatProgressSpinnerModule,MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule

  ],
  declarations: [ LayoutComponent,
     HomeComponent,
     RegisterComponent,
     PageoneComponent,
     SidebarComponent,
     NavMenuComponent,
     MenuItemsComponent,
     BlankPageComponent,
     Report1Component,
     Cpl2ManualProductionComponent,
     CustomDecimalPlaceNumberDirective
    ],
providers: [MenuService, Constants, Cpl2ManualProductionService,
  ExcelService ]
})

export class LayoutModule {
  constructor() {}
}

