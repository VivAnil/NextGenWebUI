import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RolemasterService } from './rolemaster.service';

export interface MenuItems {
  title: string;
  links: Links[];
}
export interface Links {
  label: string;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private companyId: number = 0;
  constructor(private rolemasterService: RolemasterService) {
  }
  private menuItems = new BehaviorSubject<MenuItems[]>(
    [
      {
        title: 'User Configuration',
        links: [
        ]
      },
      {
        title: 'User Details',
        links: [
        ]
      },
      {
        title: 'Company Details',
        links: [
        ]
      },
      {
        title: 'Report Section',
        links: [
        ]
      },
      {
        title: 'Service Section',
        links: [
        ]
      },
      {
        title: 'Payment Section',
        links: [
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
        ]
      },
      {
        title: 'Reports Section',
        links: [
          { label: 'LBC Reports', path: '/lbcreports' }
        ]
      }
    ]
  );
  pmRoleDisplayName: string = 'Project Officer';
  spRoleDisplayName: string = 'LBC';
  dcRoleDisplayName: string = 'District Coordinator';
  bcRoleDisplayName: string = 'CLM';
  benRoleDisplayName: string = 'RWE';

  // Public getter: returns a deep-cloned snapshot of current menu
  public getMenuItems(): MenuItems[] {
    return JSON.parse(JSON.stringify(this.menuItems.getValue()));
  }

  getCustomRoleDetails(): void {
    const customeRoles: any = localStorage.getItem("customAssignedRoles");
    const customAssignedRoles = customeRoles ? JSON.parse(customeRoles) : null;

    // If already cached in localStorage, set names synchronously and return
    if (customAssignedRoles !== null) {
      this.setRoleDisplayNames(customAssignedRoles);
      return;
    }

    // Otherwise, fetch from API
    this.rolemasterService.getCustomRoleForCompany().subscribe({
      next: (customRoles) => {
        const mapped = customRoles
          .filter((item: any) => item.companyRoleName !== null)
          .map((item: any) => ({
            profilename: item.companyRoleName,
            systemusertype: item.systemRoleName,
            companyroleid: item.companyRoleId,
            systemRoleId: item.systemRoleId,
            canDeleteCustomRole: item.canDeleteCustomRole
          }));

        localStorage.setItem("customAssignedRoles", JSON.stringify(mapped));
        this.setRoleDisplayNames(mapped);
      },
      error: (err) => {
        console.error('Error loading custom roles:', err);
      }
    });
  }

  menuItems$ = this.menuItems.asObservable();

  // make async so we can await getCustomRoleDetails()
  async modifyMenuItemsBasedOnPermissions(menuItems: MenuItems[]): Promise<MenuItems[]> {
    console.log('modifyMenuItemsBasedOnPermissions called');

    // 1️⃣ Load user role settings
    const userString = localStorage.getItem('userRoleSettings');
    const userRoleSettings = userString ? JSON.parse(userString) : null;

    if (!userRoleSettings) {
      console.warn('No userRoleSettings found in localStorage.');
      return menuItems;
    }

    // Ensure companyId is numeric
    this.companyId = Number(userRoleSettings.companyId);
    let permissionSettings = userRoleSettings.permissionSettings || [];

    // Clone base menu items to avoid mutating the BehaviorSubject base array
    let newMenu: MenuItems[] = JSON.parse(JSON.stringify(menuItems));

    // 2️⃣ Keep only assigned permissions
    permissionSettings = permissionSettings.filter(
      (setting: { permissionName: string; isAssigned: boolean }) => setting.isAssigned
    );

    // Await custom role display names so labels use correct names
    try {
      this.getCustomRoleDetails();
    } catch (err) {
      console.error('Failed to load custom role details; continuing with defaults', err);
    }

    // 3️⃣ Apply menu items based on permissions
    permissionSettings.forEach((permission: any) => {
      switch (permission.permissionName) {
        case 'Edit_Company':
          newMenu.find(m => m.title === 'Company Details')?.links.push({
            label: 'Edit Company Details',
            path: '/editcompany'
          });
          break;

        case 'View_Project':
          newMenu.find(m => m.title === 'Company Details')?.links.push({
            label: 'Project Master',
            path: '/project'
          });
          break;

        case 'View_Project_Report':
          //newMenu.find(m => m.title === 'Report Section')?.links.push({
          //  label: 'All Project Report',
          //  path: '/projectreport'
          //});
          //break;
          newMenu.find(m => m.title === 'Report Section')?.links.push({
            label:
              "LBC Report",
            path: '/lbcreport'
          });
          break;

        case 'View_Beneficiary_Report':
          newMenu.find(m => m.title === 'Report Section')?.links.push({
            label: 'All ' + this.benRoleDisplayName + ' Report',
            path: '/benReport'
          });
          break;

        case 'View_Sp_Beneficiary_Report':
          //newMenu.find(m => m.title === 'Report Section')?.links.push({
          //  label:
          //    this.spRoleDisplayName + ' Wise ' + this.benRoleDisplayName + ' Report',
          //  path: '/spwisereport'
          //});
          newMenu.find(m => m.title === 'Report Section')?.links.push({
            label:
              "LBC Report",
            path: '/lbcreport'
          });
          break;

        case 'View_Service':
          newMenu.find(m => m.title === 'Service Section')?.links.push({
            label: 'View All Services',
            path: '/services'
          });
          break;

        case 'View_Process_Payment':
          newMenu.find(m => m.title === 'Payment Section')?.links.push({
            label: 'Process Payment',
            path: '/processpayment'
          });
          break;

        case 'View_Payment_Report':
          newMenu.find(m => m.title === 'Payment Section')?.links.push({
            label: 'Payment Report',
            path: '/paymentreport'
          });
          break;

        default:
          break;
      }
    });

    // 4️⃣ Add user-based menu items
    const menuUserConfig = newMenu.find(m => m.title === 'User Configuration');
    const menuUserDetails = newMenu.find(m => m.title === 'User Details');
    if (menuUserConfig) {
      this.AddLinksBasedOnRole(menuUserConfig, userRoleSettings.systemRoleId);
    }
    if (menuUserDetails) {
      this.AddUserDetailsLinksBasedOnRole(menuUserDetails, userRoleSettings.systemRoleId);
    }
    // 5️⃣ Remove any empty menu sections
    newMenu = newMenu.filter(item => item.links && item.links.length > 0);

    // 7️⃣ Push updates to BehaviorSubject (final menu)
    this.menuItems.next(newMenu);

    return newMenu;
  }

  private AddLinksBasedOnRole(menuUserConfig: MenuItems, roleId: string): void {
    let id: number = parseInt(roleId);

    switch (id) {
      case 1:
        menuUserConfig.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserConfig.links.push({ label: 'Edit Administrator Details', path: '/editadmin' });

        break;
      case 2:
        menuUserConfig.links.push({ label: 'Application User Master', path: '/companyusermaster' });

        break;
      case 3:
        ;
        break;
      case 4:

        break;
      // User doesn't see certain links like "Process Payment" and "Payment Report"
      case 5:

        break;
      // User doesn't see certain links like "Process Payment" and "Payment Report"
      case 6:
        menuUserConfig.links.push({ label: 'Application User Master', path: '/companyusermaster' });

        break;
      default:
        break;  // Default: no links available for unknown roles
    }
  }

  private AddUserDetailsLinksBasedOnRole(menuUserDetails: MenuItems, roleId: string): void {
    let id: number = parseInt(roleId);

    switch (id) {
      case 1:
        if (this.companyId != 32) {
          menuUserDetails.links.push({ label: this.pmRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/2' });
          menuUserDetails.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        }
        menuUserDetails.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      case 2:
        if (this.companyId != 32) {
          menuUserDetails.links.push({ label: this.pmRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/2' });
          menuUserDetails.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        }
        menuUserDetails.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      case 3:
        if (this.companyId != 32) {
          menuUserDetails.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        }
        menuUserDetails.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      case 4:
        menuUserDetails?.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails?.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      case 5:
        menuUserDetails?.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      case 6:
        if (this.companyId != 32) {
          menuUserDetails.links.push({ label: this.pmRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/2' });
          menuUserDetails.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        }
        menuUserDetails.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      default:
        break;  // Default: no links available for unknown roles
    }
  }

  updateMenuItems(mi: MenuItems[]): void {
    const userString = localStorage.getItem('userRoleSettings');
    const userRoleSettings = userString ? JSON.parse(userString) : null;
    this.companyId = userRoleSettings?.companyId ?? 0;

    const filteredMenus =
      this.companyId == 32
        ? mi.filter(
          m =>
            m.title !== 'Payment Section' &&
            m.title !== 'User Configuration' &&
            m.title !== 'Report Section' &&
            m.title !== 'Service Section' &&
            m.title !== 'Project Master'
        )
        : mi.filter(
          m =>
            m.title !== "Business Section" && 
            m.title !== "Reports Section"
        );

    const newMenu = filteredMenus;
    // Emit trimmed base menu immediately
    this.menuItems.next(newMenu);

    // compute permission-based additions asynchronously; final menu will be emitted from modifier
    this.modifyMenuItemsBasedOnPermissions(newMenu).catch(err => {
      console.error('Error computing permission-based menu', err);
    });
  }

  resetMenu(): void {
    const items: MenuItems[] = [
      {
        title: 'User Configuration',
        links: [
        ]
      },
      {
        title: 'User Details',
        links: [
        ]
      },
      {
        title: 'Company Details',
        links: [
        ]
      },
      {
        title: 'Report Section',
        links: [
        ]
      },
      {
        title: 'Service Section',
        links: [
        ]
      },
      {
        title: 'Payment Section',
        links: [
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
        ]
      },
      {
        title: 'Reports Section',
        links: [
          { label: 'LBC Reports', path: '/lbcreports' }
        ]
      }
    ];
    this.menuItems.next(items);
  }

  private setRoleDisplayNames(customAssignedRoles: any[]): void {
    this.pmRoleDisplayName = customAssignedRoles.find(r => r.systemRoleId === 2)?.profilename ?? '';
    this.spRoleDisplayName = customAssignedRoles.find(r => r.systemRoleId === 3)?.profilename ?? '';
    this.dcRoleDisplayName = customAssignedRoles.find(r => r.systemRoleId === 4)?.profilename ?? '';
    this.bcRoleDisplayName = customAssignedRoles.find(r => r.systemRoleId === 5)?.profilename ?? '';
    this.benRoleDisplayName = customAssignedRoles.find(r => r.systemRoleId === 7)?.profilename ?? '';
  }
}
