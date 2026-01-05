import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService, MenuItems } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: MenuItems[] = [];
  companyId!: number;
  roleId!: number;
  activeSection: number | null = null;

  private menuSub?: Subscription;

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

    // Subscribe to the service observable so the sidebar gets the initial value
    // and any subsequent menu updates automatically.
    this.menuSub = this.menuService.menuItems$.subscribe(items => {
      this.menuItems = items;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.menuSub?.unsubscribe();
  }

  viewCompany(companyId: number, roleId: number): void {
    this.router.navigate(['/user', companyId, roleId]);
  }
}
