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

  updateMenuItems(menuItems: MenuItems[]): void {
    this.menuItems.next(menuItems);
  }
}
