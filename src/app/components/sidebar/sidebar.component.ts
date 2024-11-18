import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems = [
    { title: 'User Configuration', 
	  links: 
		[{ label: 'Application User Master', path: '/companyusermaster' }, 
		 { label: 'Edit Administrator Details', path: '/editadmin' }] 
	},
     { title: 'User Details', 
	  links: 
		[{ label: 'Project Officer Master', path: '/projectofficer' }, 
		 { label: 'District Coordinator Master', path: '/dc' },
		 { label: 'Block Coordinator Master', path: '/bc' }, 
		 { label: 'SoochnaPreneur Master', path: '/sp' },
		 { label: 'Beneficiary Master', path: '/bn' }
		  ] 
	},
	{ title: 'Company Details', 
	  links: 
		[{ label: 'Edit Company Details', path: '/editcompanydetails' }, 
		 { label: 'Project Master', path: '/project' }
		 
		  ] 
	},
	{ title: 'Report Section', 
	  links: 
		[{ label: 'All Project Report', path: '/projectreport' }, 
		 { label: 'All Beneficiaries Report', path: '/beneficiaryreport' },
		 { label: 'SP Wise Beneficiaries Report', path: '/spwisereport' }
		 
		  ] 
	},
	{ title: 'Service Section', 
	  links: 
		[{ label: 'View All Services', path: '/services' }		 
		  ] 
	},
	{ title: 'Payment Section', 
	  links: 
		[{ label: 'Process Payment', path: '/processpayment' }, 
		 { label: 'Payment Report', path: '/paymentreport' }
		 ] 
	}
  ];
  constructor() { }

  ngOnInit(): void {
  }
  activeSection: number | null = null;

  toggleSection(index: number) {
    this.activeSection = this.activeSection === index ? null : index;
  }
}
