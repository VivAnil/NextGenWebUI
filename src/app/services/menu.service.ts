import { Injectable } from '@angular/core';
import { Title } from 'chart.js';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { RolemasterService } from './rolemaster.service';

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

  constructor(private rolemasterService: RolemasterService) {
  }
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
          //{label:'Project Officer Master', path:'/user/'},
          //{label:'District Coordinator Master', path:'/user/'},
          //{label:'Block Coordinator Master', path:'/user/'},
          //{label:'SoochnaPreneur Master', path:'/user/'},
          //{label:'Beneficiary Master', path:'/bn/'},
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
  pmRoleDisplayName: string ='Project Officer';
  spRoleDisplayName: string = 'SoochnaPreneur';
  dcRoleDisplayName: string = 'District Coordinator';
  bcRoleDisplayName: string = 'Block Coordinator';
  benRoleDisplayName: string = 'Beneficiary';
  getCustomRoleDetails() {
    var customeRoles: any = localStorage.getItem("customAssignedRoles");
    let customAssignedRoles = customeRoles ? JSON.parse(customeRoles) : null;

    if (customAssignedRoles === null) {
      this.rolemasterService.getCustomRoleForCompany().subscribe(customRoles => {
        customAssignedRoles = customRoles.filter(item => item.companyRoleName !== null).
          map(item => ({
            profilename: item.companyRoleName,
            systemusertype: item.systemRoleName,
            companyroleid: item.companyRoleId,
            systemRoleId: item.systemRoleId,
            canDeleteCustomRole: item.canDeleteCustomRole
          }));
        localStorage.setItem("customAssignedRoles", JSON.stringify(customAssignedRoles));
      }
      );
    }
    this.pmRoleDisplayName = customAssignedRoles.filter((role : any) => role.systemRoleId === 2)[0]?.profilename ?? '';
    this.spRoleDisplayName = customAssignedRoles.filter((role: any) => role.systemRoleId === 3)[0]?.profilename ?? '';
    this.dcRoleDisplayName = customAssignedRoles.filter((role: any) => role.systemRoleId === 4)[0]?.profilename ?? '';
    this.bcRoleDisplayName = customAssignedRoles.filter((role: any) => role.systemRoleId === 5)[0]?.profilename ?? '';
    this.benRoleDisplayName = customAssignedRoles.filter((role: any) => role.systemRoleId === 7)[0]?.profilename ?? '';
  }
  menuItems$ = this.menuItems.asObservable();
  private companyId: number = 0;
  modifyMenuItemsBasedOnPermissions(menuItems: MenuItems[]): MenuItems[] {
    console.log('modifyMenuItem');
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    this.companyId = userRoleSettings.companyId;
    let newMenu = menuItems; // Clone the original menuItems to avoid mutating the original state.
    permissionSettings = permissionSettings.filter((setting: { permissionName: string, isAssigned: boolean }) => setting.isAssigned);
    this.getCustomRoleDetails();

    permissionSettings.forEach((permission: any) => {
      console.log(`Permission: ${permission.permissionName} is ${permission.permissionId}`);
     
      switch (permission.permissionName) {
        case 'Edit_Company':
          var menuItem = newMenu.filter(menu => menu.title === "Company Details")[0];
          if (menuItem && menuItem.links) {
            menuItem.links.push({ label: 'Edit Company Details', path: '/editcompany' });
          }
          break;
        case 'View_Project':
          var menuItem = newMenu.filter(menu => menu.title === "Company Details")[0];
          if (menuItem && menuItem.links) {

            menuItem.links.push({ label: 'Project Master', path: '/project' });
          }
          break;
        case 'View_Project_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Report Section")[0];
          if (menuItem && menuItem.links) {

            menuItem.links.push({ label: 'All Project Report', path: '/projectreport' });
          }
          break;
        case 'View_Beneficiary_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Report Section")[0];
          if (menuItem && menuItem.links) {
            menuItem.links.push({ label: 'All ' + this.benRoleDisplayName + ' Report', path: '/benReport' });
          }
          break;
        case 'View_Sp_Beneficiary_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Report Section")[0];
          if (menuItem && menuItem.links) {
            menuItem.links.push({ label: this.spRoleDisplayName + ' Wise ' + this.benRoleDisplayName + ' Report', path: '/spwisereport' });
          }
          break;
        case 'View_Service':
          var menuItem = newMenu.filter(menu => menu.title === "Service Section")[0];
          if (menuItem && menuItem.links) {
            menuItem.links.push({ label: 'View All Services', path: '/services' });
          }
          break;
        case 'View_Process_Payment':
          var menuItem = newMenu.filter(menu => menu.title === "Payment Section")[0];
          if (menuItem && menuItem.links) {
            menuItem.links.push({ label: 'Process Payment', path: '/processpayment' });
          }
          break;
        case 'View_Payment_Report':
          var menuItem = newMenu.filter(menu => menu.title === "Payment Section")[0];
          if (menuItem && menuItem.links) {
            menuItem.links.push({ label: 'Payment Report', path: '/paymentreport' });
          }
          break;
        default:
          return ; // Keep the link if no matching permission
      }
    });
    var menuUserConfig = newMenu.filter(menu => menu.title === "User Configuration")[0];
    var menuUserDetails = newMenu.filter(menu => menu.title === "User Details")[0];

    this.AddLinksBasedOnRole(menuUserConfig, menuUserDetails, userRoleSettings.systemRoleId);
    newMenu = newMenu.filter(item => item.links && item.links.length > 0);
    return newMenu;
  }

  private AddLinksBasedOnRole(menuUserConfig: MenuItems, menuUserDetails:MenuItems, roleId: string): void {
    let id: number = parseInt(roleId);

    //[{ label: 'Project Officer Master', path: '/user/' + this.companyId + '/2' },
    //  { label: 'District Coordinator Master', path: '/user/' + this.companyId + '/4' },
    //  { label: 'Block Coordinator Master', path: '/user/' + this.companyId + '/5' },
    //  { label: 'SoochnaPreneur Master', path: '/user/' + this.companyId + '/3' },

    switch (id) {
      case 1:
        menuUserConfig?.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserConfig?.links.push({ label: 'Edit Administrator Details', path: '/editadmin' });
        menuUserDetails?.links.push({ label: this.pmRoleDisplayName+' Master', path: '/user/' + this.companyId + '/2' });
        menuUserDetails?.links.push({ label: this.dcRoleDisplayName+' Master', path: '/user/' + this.companyId + '/4' });
        menuUserDetails?.links.push({ label: this.bcRoleDisplayName+' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails?.links.push({ label: this.spRoleDisplayName+' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName+' Master', path: '/bn/' + this.companyId +'/0/0' });
        break;
      case 2:
        menuUserConfig?.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserDetails?.links.push({ label: this.pmRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/2' });
        menuUserDetails?.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        menuUserDetails?.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails?.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      case 3:
        menuUserDetails?.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        menuUserDetails?.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails?.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
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
        menuUserConfig?.links.push({ label: 'Application User Master', path: '/companyusermaster' });
        menuUserDetails?.links.push({ label: this.pmRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/2' });
        menuUserDetails?.links.push({ label: this.dcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/4' });
        menuUserDetails?.links.push({ label: this.bcRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/5' });
        menuUserDetails?.links.push({ label: this.spRoleDisplayName + ' Master', path: '/user/' + this.companyId + '/3' });
        menuUserDetails?.links.push({ label: this.benRoleDisplayName + ' Master', path: '/bn/' + this.companyId + '/0/0' });
        break;
      default:
        break;  // Default: no links available for unknown roles
    }
  }

  updateMenuItems(menuItems:MenuItems[]): void {
    let items = this.modifyMenuItemsBasedOnPermissions(menuItems);
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
      }
    ];
    this.menuItems.next(items);
  }
}
