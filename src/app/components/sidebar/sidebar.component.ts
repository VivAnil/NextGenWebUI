import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService, MenuItems } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: MenuItems[] = [];
  companyId!: number;
  roleId!: number;
  activeSection: number | null = null;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) { }

  toggleSection(index: number) {
    this.activeSection = this.activeSection === index ? null : index;
  }

  ngOnInit(): void {
    const userString = localStorage.getItem('userRoleSettings');
    const userRoleSettings = userString ? JSON.parse(userString) : null;
    if (userRoleSettings) {
      this.roleId = userRoleSettings.companyRoleId;
      this.companyId = userRoleSettings.companyId;
    }

    // Load menu once from the service (snapshot / computed)
    if (typeof this.menuService.updateMenuItems === 'function') {
      // prefer computed menu that applies permissions
      // pass the static base if your service exposes it, otherwise getMenuItems()
      // Example: this.menuItems = this.menuService.updateMenuItems(MenuService.DEFAULT_MENU);
      this.menuItems = this.menuService.getMenuItems();
    } else if (typeof this.menuService.getMenuItems === 'function') {
      this.menuItems = this.menuService.getMenuItems();
    }

    this.cdr.markForCheck();
  }

  viewCompany(companyId: number, roleId: number): void {
    this.router.navigate(['/user', companyId, roleId]);
  }
}
