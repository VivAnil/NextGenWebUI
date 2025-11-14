import { Injectable } from '@angular/core';
import { Title } from 'chart.js';
import { MenuItem } from 'primeng/api';
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
          //{label:'Application User Master', path:'/companyusermaster'},
          //{label:'Edit Administrator Details', path:'/editadmin'}
        ]
      },
      {
        title: 'User Details',
        links: [
          //{label:'Project Officer Master', path:'/user/'},
          //{label:'District Coordinator Master', path:'/user/'},
          //{label:'Block Coordinator Master', path:'/user/'},
          //{label:'SoochnaPreneur Master', path:'/user/'},
          //{label:'Beneficiary Master', path:'/bn/'},
        ]
      },
      {
        title: 'Company Details',
        links: [
          //{label:'Edit Company Details', path: '/editcompany'},
          //{label:'Project Master', path: '/project' }
        ]
      },
      {
        title: 'Report Section',
        links: [
          //{ label: 'All Project Report', path: '/projectreport' },
          //{ label: 'All Beneficiaries Report', path: '/benReport' },
          //{ label: 'SP Wise Beneficiaries Report', path: '/spwisereport' }
        ]
      },
      {
        title: 'Service Section',
        links: [
          //{ label: 'View All Services', path: '/services' }
        ]
      },
      {
        title: 'Payment Section',
        links: [
          //{ label: 'Process Payment', path: '/processpayment' }, 
          //{ label: 'Payment Report', path: '/paymentreport' }
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
        ]
      }
    ]
  );
  pmRoleDisplayName: string = 'Project Officer';
  spRoleDisplayName: string = 'SoochnaPreneur';
  dcRoleDisplayName: string = 'District Coordinator';
  bcRoleDisplayName: string = 'Block Coordinator';
  benRoleDisplayName: string = 'Beneficiary';
  async getCustomRoleDetails(): Promise<void> {
    let customeRoles: any = localStorage.getItem("customAssignedRoles");
    let customAssignedRoles = customeRoles ? JSON.parse(customeRoles) : null;

    // If already cached in localStorage, no API call needed
    if (customAssignedRoles !== null) {
      this.setRoleDisplayNames(customAssignedRoles);
      return;
    }

    // Otherwise, fetch from API
    return new Promise((resolve, reject) => {
      this.rolemasterService.getCustomRoleForCompany().subscribe({
        next: (customRoles) => {
          customAssignedRoles = customRoles
            .filter((item: any) => item.companyRoleName !== null)
            .map((item: any) => ({
            profilename: item.companyRoleName,
            systemusertype: item.systemRoleName,
            companyroleid: item.companyRoleId,
            systemRoleId: item.systemRoleId,
            canDeleteCustomRole: item.canDeleteCustomRole
          }));

        localStorage.setItem("customAssignedRoles", JSON.stringify(customAssignedRoles));
          this.setRoleDisplayNames(customAssignedRoles);
          resolve();
        },
        error: (err) => {
          console.error('Error loading custom roles:', err);
          reject(err);
      }
      });
    });
  }
  menuItems$ = this.menuItems.asObservable();

  modifyMenuItemsBasedOnPermissions(menuItems: MenuItems[]): MenuItems[] {
    console.log('modifyMenuItemsBasedOnPermissions called');

    // 1️⃣ Load user role settings
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;

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

    // Load custom role display names
    this.getCustomRoleDetails();

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
          newMenu.find(m => m.title === 'Report Section')?.links.push({
            label: 'All Project Report',
            path: '/projectreport'
          });
          break;

        case 'View_Beneficiary_Report':
          newMenu.find(m => m.title === 'Report Section')?.links.push({
            label: 'All ' + this.benRoleDisplayName + ' Report',
            path: '/benReport'
          });
          break;

        case 'View_Sp_Beneficiary_Report':
          newMenu.find(m => m.title === 'Report Section')?.links.push({
            label:
              this.spRoleDisplayName + ' Wise ' + this.benRoleDisplayName + ' Report',
            path: '/spwisereport'
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



    // 7️⃣ Push updates to BehaviorSubject
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

    //[{ label: 'Project Officer Master', path: '/user/' + this.companyId + '/2' },
    //  { label: 'District Coordinator Master', path: '/user/' + this.companyId + '/4' },
    //  { label: 'Block Coordinator Master', path: '/user/' + this.companyId + '/5' },
    //  { label: 'SoochnaPreneur Master', path: '/user/' + this.companyId + '/3' },

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
      // User doesn't see certain links like "Process Payment" and "Payment Report"
      case 5:
        menuUserDetails?.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      // User doesn't see certain links like "Process Payment" and "Payment Report"
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
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    this.companyId = userRoleSettings.companyId;
    const filteredMenus =
      this.companyId == 32
        ? mi.filter(
          m =>
            m.title !== 'Payment Section' &&
            m.title !== 'User Configuration' &&
            m.title !== 'Report Section'
        )
        : mi.filter(
          m =>
          m.title !="Business Section"
        );

    let newMenu = filteredMenus;
    this.menuItems.next(newMenu);

    let items = this.modifyMenuItemsBasedOnPermissions(newMenu);
    this.menuItems.next(items);
  }

  resetMenu(): void {
    let items = [
      {
        title: 'User Configuration',
        links: [
          //{label:'Application User Master', path:'/companyusermaster'},
          //{label:'Edit Administrator Details', path:'/editadmin'}
        ]
      },
      {
        title: 'User Details',
        links: [
          //{label:'Project Officer Master', path:'/user/'},
          //{label:'District Coordinator Master', path:'/user/'},
          //{label:'Block Coordinator Master', path:'/user/'},
          //{label:'SoochnaPreneur Master', path:'/user/'},
          //{label:'Beneficiary Master', path:'/bn/'},
        ]
      },
      {
        title: 'Company Details',
        links: [
          //{label:'Edit Company Details', path: '/editcompany'},
          //{label:'Project Master', path: '/project' }
        ]
      },
      {
        title: 'Report Section',
        links: [
          //{ label: 'All Project Report', path: '/projectreport' },
          //{ label: 'All Beneficiaries Report', path: '/benReport' },
          //{ label: 'SP Wise Beneficiaries Report', path: '/spwisereport' }
        ]
      },
      {
        title: 'Service Section',
        links: [
          //{ label: 'View All Services', path: '/services' }
        ]
      },
      {
        title: 'Payment Section',
        links: [
          //{ label: 'Process Payment', path: '/processpayment' }, 
          //{ label: 'Payment Report', path: '/paymentreport' }
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
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
