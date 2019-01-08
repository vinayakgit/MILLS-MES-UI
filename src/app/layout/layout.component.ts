import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
import { Router } from '@angular/router';
import { MenuService } from './components/menu/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  collapedSideBar: boolean;
  opened: boolean = true;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  // navLinks = [{path: '/register',label: 'Register'},
  // {path: '/pageone',label: 'Page One'},
  // {path: '/home',label: 'Home'}];
    navLinks: Array<any> = [];
    constructor(private router: Router, private menuService: MenuService) {
    }

    ngOnInit() {
      this.menuService.menuPushedToTabs$.subscribe(
        menuItem => {
          const i =  this.navLinks.indexOf(menuItem);
        if (i >= 0) {
          this.router.navigateByUrl(this.navLinks[i].routerUrl);
        } else {
          this.navLinks.push(menuItem);
        }
        }
      );
    }

    showInfo() {
      this.trigger.openMenu();
    }
    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }

    closeTab(i: number) {
      if (this.navLinks.length === 1 && i === 0) {
        this.router.navigateByUrl('/blank');
      } else if (this.navLinks.length > 1 && i === 0 ) {
        this.router.navigateByUrl(this.navLinks[(i + 1)].routerUrl);
      } else if (this.navLinks.length > 1 && i === (this.navLinks.length - 1) ) {
        this.router.navigateByUrl(this.navLinks[(i - 1)].routerUrl);
      }
      this.navLinks.splice(i, 1);
    }

    // onPush($event: any) {
    //   const i =  this.navLinks.indexOf($event);
    //   if (i >= 0) {
    //     this.router.navigateByUrl(this.navLinks[i].routerUrl);
    //   } else {
    //     this.navLinks.push($event);
    //   }
    // }
}
