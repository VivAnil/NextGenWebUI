import { Injectable } from '@angular/core';
import { Title } from 'chart.js';
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
          {label:'Application User Master', path:'/companyusermaster'},
          {label:'Edit Administrator Details', path:'/editadmin'}
        ]
      },
      {
        title: 'User Details', 
        links:[
          {label:'Project Officer Master', path:'/user'},
          {label:'District Coordinator Master', path:'/user'},
          {label:'Block Coordinator Master', path:'/user'},
          {label:'SoochnaPreneur Master', path:'/user'},
          {label:'Beneficiary Master', path:'/bn'},
        ]
      },
      {
        title: 'Company Details', 
        links:[
          {label:'Edit Company Details', path: '/editcompany'},
          {label:'Project Master', path: '/project' }
        ]
      },
      {
        title: 'Report Section', 
        links:[
          { label: 'All Project Report', path: '/projectreport' },
          { label: 'All Beneficiaries Report', path: '/benReport' },
          { label: 'SP Wise Beneficiaries Report', path: '/spwisereport' }
        ]
      },
      {
        title: 'Service Section', 
        links:[
          { label: 'View All Services', path: '/services' }
        ]
      },
      {
        title: 'Payment Section', 
        links:[
          { label: 'Process Payment', path: '/processpayment' }, 
          { label: 'Payment Report', path: '/paymentreport' }
        ]
      }
    ]
  );
  menuItems$ = this.menuItems.asObservable();

  modifyMenuItemsBasedOnPermissions(): MenuItems[] {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];

    let newMenu = [...this.menuItems.getValue()]; // Clone the original menuItems to avoid mutating the original state.

    permissionSettings.forEach((permission: any) => {
      console.log(`Permission: ${permission.permissionName} is ${permission.permissionId}`);

      newMenu.forEach((menu) => {
        // Loop through the links of each menu item
        menu.links = menu.links.filter((link) => {
          switch (permission.permissionName) {
            case 'Edit_Company':
              return permission.isAssigned || link.label !== 'Edit Company Details';
            //case 'Delete_Company':
            //  // Remove or disable delete company if not assigned
            //  return permission.isAssigned || link.label !== 'Delete Company Details';
            //case 'Add_Project':
            //  return permission.isAssigned || link.label !== 'Add Project';
            //case 'Edit_Project':
            //  return permission.isAssigned || link.label !== 'Edit Project';
            case 'View_Project':
              return permission.isAssigned || link.label !== 'Project Master';
            //case 'Delete_Project':
            //  return permission.isAssigned || link.label !== 'Delete Project';
            case 'View_Project_Report':
              return permission.isAssigned || link.label !== 'All Project Report';
            case 'View_Beneficiary_Report':
              return permission.isAssigned || link.label !== 'All Beneficiaries Report';
            case 'View_Sp_Beneficiary_Report':
              return permission.isAssigned || link.label !== 'SP Wise Beneficiaries Report';
            //case 'Add_Service_Pillar':
            //  return permission.isAssigned || link.label !== 'Add Service Pillar';
            //case 'Edit_Service_Pillar':
            //  return permission.isAssigned || link.label !== 'Edit Service Pillar';
            case 'View_Service_Pillar':
              return permission.isAssigned || link.label !== 'View Service Pillar';
            //case 'Delete_Service_Pillar':
            //  return permission.isAssigned || link.label !== 'Delete Service Pillar';
            //case 'Add_Service':
            //  return permission.isAssigned || link.label !== 'Add Service';
            //case 'Edit_Service':
            //  return permission.isAssigned || link.label !== 'Edit Service';
            case 'View_Service':
              return permission.isAssigned || link.label !== 'View Service';
            case 'Delete_Service':
              return permission.isAssigned || link.label !== 'Delete Service';
            case 'View_Process_Payment':
              return permission.isAssigned || link.label !== 'Process Payment';
            case 'View_Payment_Report':
              return permission.isAssigned || link.label !== 'Payment Report';
            default:
              return true; // Keep the link if no matching permission
          }
        });
      });
    });

    if (userRoleSettings.SystemRoleId !== 1) {
      if (userRoleSettings.SystemRoleId === 6) {
        newMenu = newMenu.filter((link) => {

        });
      }
      newMenu = newMenu.map(item => ({
        ...item,
        links: this.filterLinksBasedOnRole(item.links, userRoleSettings.SystemRoleId)  // Optionally hide the title if needed
      }));

    }

    newMenu = newMenu.filter(item => item.links && item.links.length > 0);
    return newMenu;
  }

  private filterLinksBasedOnRole(links: Links[], roleId: string): Links[] {
    return links.filter(link => {
      switch (roleId) {
        case '1':
          return true;  // Admin sees all links
        case '2':
          // User doesn't see certain links like "Process Payment" and "Payment Report"
          return link.label !== 'Project Officer Master' && link.label !== 'Edit Administrator Details';
        case '3':
          // Manager doesn't see "Service Section"
          return link.label !== 'Project Officer Master' && link.label !== 'District Coordinator Master' && link.label !== 'Block Coordinator Master' && link.label !== 'SoochnaPreneur Master' && link.label !== 'Edit Administrator Details';
        case '4':
          // User doesn't see certain links like "Process Payment" and "Payment Report"
          return link.label !== 'Project Officer Master' && link.label !== 'District Coordinator Master' && link.label !== 'Edit Administrator Details';
        case '5':
          // User doesn't see certain links like "Process Payment" and "Payment Report"
          return link.label !== 'Project Officer Master' && link.label !== 'District Coordinator Master' && link.label !== 'Block Coordinator Master' && link.label !== 'Edit Administrator Details';
        case '6':
          // User doesn't see certain links like "Process Payment" and "Payment Report"
          return link.label !== 'Edit Administrator Details' && link.label !== 'Edit Administrator Details';
        default:
          return false;  // Default: no links available for unknown roles
      }
    });
  }


  updateMenuItems(menuItems: MenuItems[]): void {
    let items = this.modifyMenuItemsBasedOnPermissions();
    this.menuItems.next(items);
  }
}
