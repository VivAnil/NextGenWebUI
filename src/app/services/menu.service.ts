import { Injectable } from '@angular/core';
import { Title } from 'chart.js';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';

export interface MenuItems {
  title:string;
  links: Links[];
}
export interface Links{
  label: string;
  path: string;
}


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  private menuItems = new BehaviorSubject<MenuItems[]>(
    [
      {
        title: 'User Configuration', 
        links:[
          //{label:'Application User Master', path:'/companyusermaster'},
          //{label:'Edit Administrator Details', path:'/editadmin'}
        ]
      },
      {
        title: 'User Details', 
        links:[
          //{label:'Project Officer Master', path:'/user'},
          //{label:'District Coordinator Master', path:'/user'},
          //{label:'Block Coordinator Master', path:'/user'},
          //{label:'SoochnaPreneur Master', path:'/user'},
          //{label:'Beneficiary Master', path:'/bn'},
        ]
      },
      {
        title: 'Company Details', 
        links:[
          //{label:'Edit Company Details', path: '/editcompany'},
          //{label:'Project Master', path: '/project' }
        ]
      },
      {
        title: 'Report Section', 
        links:[
          //{ label: 'All Project Report', path: '/projectreport' },
          //{ label: 'All Beneficiaries Report', path: '/benReport' },
          //{ label: 'SP Wise Beneficiaries Report', path: '/spwisereport' }
        ]
      },
      {
        title: 'Service Section', 
        links:[
          //{ label: 'View All Services', path: '/services' }
        ]
      },
      {
        title: 'Payment Section', 
        links:[
          //{ label: 'Process Payment', path: '/processpayment' }, 
          //{ label: 'Payment Report', path: '/paymentreport' }
        ]
      }
    ]
  );
  menuItems$ = this.menuItems.asObservable();

  modifyMenuItemsBasedOnPermissions(): MenuItems[] {
    console.log('modifyMenuItem');
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];

    let newMenu = [...this.menuItems.getValue()]; // Clone the original menuItems to avoid mutating the original state.

    permissionSettings.forEach((permission: any) => {
      console.log(`Permission: ${permission.permissionName} is ${permission.permissionId}`);
     
      switch (permission.permissionName) {
        case 'Edit_Company':
          var menuItem = newMenu.filter(menu => menu.title === "Company Details")[0];
          menuItem.links.push({ label: 'Edit Company Details', path: '/editcompany' });
          break;
        case 'View_Project':
          var menuItem = newMenu.filter(menu => menu.title === "Company Details")[0];
          menuItem.links.push({ label: 'Project Master', path: '/project' });
          break;
        case 'View_Project_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Report Section")[0];
          menuItem.links.push({ label: 'All Project Report', path: '/projectreport' });
          break;
        case 'View_Beneficiary_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Report Section")[0];
          menuItem.links.push({ label: 'All Beneficiaries Report', path: '/benReport' });
          break;
        case 'View_Sp_Beneficiary_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Report Section")[0];
          menuItem.links.push({ label: 'SP Wise Beneficiaries Report', path: '/spwisereport' });
          break;
        case 'View_Service':
          var menuItem = newMenu.filter(menu => menu.title === "Service Section")[0];
          menuItem.links.push({ label: 'View All Services', path: '/services' });
          break;
        case 'View_Process_Payment':
          var menuItem = newMenu.filter(menu => menu.title === "Payment Section")[0];
          menuItem.links.push({ label: 'Process Payment', path: '/processpayment' });
          break;
        case 'View_Payment_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Payment Section")[0];
          menuItem.links.push({ label: 'Payment Report', path: '/paymentreport' });
          break;
        default:
          return ; // Keep the link if no matching permission
      }
    });
    var menuUserConfig = newMenu.filter(menu => menu.title === "User Configuration")[0];
    var menuUserDetails = newMenu.filter(menu => menu.title === "User Details")[0];

    this.AddLinksBasedOnRole(menuUserConfig, menuUserDetails, userRoleSettings.systemRoleId);
    //newMenu = newMenu.filter(item => item.links && item.links.length == 0);
    return newMenu;
  }

  private AddLinksBasedOnRole(menuUserConfig: MenuItems, menuUserDetails:MenuItems, roleId: string): void {
    let id :number = parseInt(roleId);
    switch (id) {
      case 1:
        menuUserConfig.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserConfig.links.push({ label: 'Edit Administrator Details', path: '/editadmin' });
        menuUserDetails.links.push({ label: 'Project Officer Master', path: '/user' });
        menuUserDetails.links.push({ label: 'District Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Block Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'SoochnaPreneur Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Beneficiary Master', path: '/bn' });
        break;
      case 2:
        menuUserConfig.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserDetails.links.push({ label: 'Project Officer Master', path: '/user' });
        menuUserDetails.links.push({ label: 'District Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Block Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'SoochnaPreneur Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Beneficiary Master', path: '/bn' });
        break;
      case 3:
        menuUserDetails.links.push({ label: 'District Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Block Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'SoochnaPreneur Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Beneficiary Master', path: '/bn' });
        break;
      case 4:
        menuUserDetails.links.push({ label: 'Block Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'SoochnaPreneur Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Beneficiary Master', path: '/bn' });
        break;
      // User doesn't see certain links like "Process Payment" and "Payment Report"
      case 5:
        menuUserDetails.links.push({ label: 'SoochnaPreneur Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Beneficiary Master', path: '/bn' });
        break;
      // User doesn't see certain links like "Process Payment" and "Payment Report"
      case 6:
        menuUserConfig.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserDetails.links.push({ label: 'Project Officer Master', path: '/user' });
        menuUserDetails.links.push({ label: 'District Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Block Coordinator Master', path: '/user' });
        menuUserDetails.links.push({ label: 'SoochnaPreneur Master', path: '/user' });
        menuUserDetails.links.push({ label: 'Beneficiary Master', path: '/bn' });
        break;
      default:
        break;  // Default: no links available for unknown roles
    }
  }

  updateMenuItems(menuItems: MenuItems[]): void {
    let items = this.modifyMenuItemsBasedOnPermissions();
    this.menuItems.next(items);
  }
}
