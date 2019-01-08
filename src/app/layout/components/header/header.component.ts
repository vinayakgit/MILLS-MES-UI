import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pushRightClass: string = 'push-right';

  constructor(public router: Router) {

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

  isToggled(): boolean {
      const dom: Element = document.querySelector('body');
      return dom.classList.contains(this.pushRightClass);
  }
    toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle(this.pushRightClass);
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
