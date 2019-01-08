import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { Response } from '@angular/http';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  menus = [];
  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.getMenu().subscribe(
      (data) => {
        this.menus = data;
      },
      (error) => {

      }
    );
  }
}
