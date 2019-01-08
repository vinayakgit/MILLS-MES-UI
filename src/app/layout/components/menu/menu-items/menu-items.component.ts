import { Component, OnInit, Input, ViewChild, Output, OnDestroy } from '@angular/core';
import { EventEmitter } from 'events';
import { MenuService } from '../menu.service';
import { MatMenuPanel } from '@angular/material';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit, OnDestroy {

  @Input() items;
  submenu = [];
  @ViewChild('menuChild') public menuChild;

  constructor(private menusService: MenuService) {
   }

  ngOnInit() {
    this.submenu = this.items;
  }


  pushToTabs(child: any) {
    this.menusService.pushMenuToTabs(child);
  }

  ngOnDestroy() {
    this.submenu = [];
  }
}
