import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService, MenuItems } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

//   menuItems = [
//     { title: 'User Configuration', 
// 	  links: 
// 		[{ label: 'Application User Master', path: '/companyusermaster' }, 
// 		 { label: 'Edit Administrator Details', path: '/editadmin' }] 
// 	},
//      { title: 'User Details', 
// 	  links: 
// 		[{ label: 'Project Officer Master'}, 
// 		 { label: 'District Coordinator Master', path: '/dc' },
// 		 { label: 'Block Coordinator Master', path: '/bc' }, 
// 		 { label: 'SoochnaPreneur Master', path: '/sp' },
// 		 { label: 'Beneficiary Master', path: '/bn' }
// 		  ] 
// 	},
// 	{ title: 'Company Details', 
// 	  links: 
// 		[{ label: 'Edit Company Details', path: '/editcompany' }, 
// 		 { label: 'Project Master', path: '/project' }
		 
// 		  ] 
// 	},
// 	{ title: 'Report Section', 
// 	  links: 
// 		[{ label: 'All Project Report', path: '/projectreport' }, 
// 		 { label: 'All Beneficiaries Report', path: '/benReport' },
// 		 { label: 'SP Wise Beneficiaries Report', path: '/spwisereport' }
		 
// 		  ] 
// 	},
// 	{ title: 'Service Section', 
// 	  links: 
// 		[{ label: 'View All Services', path: '/services' }		 
// 		  ] 
// 	},
// 	{ title: 'Payment Section', 
// 	  links: 
// 		[{ label: 'Process Payment', path: '/processpayment' }, 
// 		 { label: 'Payment Report', path: '/paymentreport' }
// 		 ] 
// 	}
//   ];

  menuItems : MenuItems[] = [];
  companyId !: number;
  roleId !: number;
	
   constructor( private router: Router, private route: ActivatedRoute, private menuService: MenuService) { }


  activeSection: number | null = null;

  toggleSection(index: number) {
    this.activeSection = this.activeSection === index ? null : index;
  }

  ngOnInit(): void {
    let userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    if (userRoleSettings != null && userRoleSettings != undefined)
    {
    this.roleId = userRoleSettings.companyRoleId;
    this.companyId=userRoleSettings.companyId;
    }

    console.log('companyId =' + this.companyId + ' and roleId = ' + this.roleId);

   // this.menuItems = this.menuService.modifyMenuItemsBasedOnPermissions();

	this.menuService.menuItems$.subscribe(items => {
		this.menuItems = items;
	  });
  }

  viewCompany(companyId: number, roleId:number): void {
    console.log('companyId = ' +companyId +' role id = ' + roleId);
    this.router.navigate(['/user', companyId, roleId]
      //{ queryParams: { 'companyid': companyId, 'roleid': roleId } }
    );

  }
}
