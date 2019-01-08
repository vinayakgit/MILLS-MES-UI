import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  isActive: boolean = false;
    collapsed: boolean = false;
    showMenu: string = '';
    pushRightClass: string = 'push-right';
    arrowLeftClass:boolean =true;
    subMenus = [];
    menus = [
      {
        mainMenu: 'main1',
        url: '/',
        subMenu: [
          {
            name: 'submenu1',
            url: '/home1'
          },
          {
            name: 'submenu2',
            url: '/home2'
          },
          {
            name: 'submenu3',
            url: '/hom3'
          }
        ]
      },
      {
        mainMenu: 'main2',
        url: '/',
        subMenu: [
          {
            name: 'submenu1',
            url: '/home1'
          },
          {
            name: 'submenu2',
            url: '/home2'
          },
          {
            name: 'submenu3',
            url: '/hom3'
          }
        ]
      }
    ]

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor( public router: Router) {
        // this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
        // this.translate.setDefaultLang('en');
        // const browserLang = this.translate.getBrowserLang();
        // this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
        this.arrowLeftClass = !this.arrowLeftClass;
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }


    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    pushSubMenu(menu) {
      if(menu.subMenu &&  menu.subMenu.size > 0){
      this.subMenus = menu.subMenu;
      }
      else{
        this.subMenus =[];
      }
    }

}
