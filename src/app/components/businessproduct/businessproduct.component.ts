import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { RWEBusinessFilters, rweBusiness } from '../../services/rweBusiness.service';
import { RWEBusinessType, RWEServiceOrProduct, RWEBusinessSubCatType } from '../../models/rwe-business.model'
declare let $: any; // Import jQuery

@Component({
  selector: 'app-businessproduct',
  templateUrl: './businessproduct.component.html',
  styleUrls: ['./businessproduct.component.css']
})
export class BusinessproductComponent implements OnInit {
  companyId: any;
  roleId: any;
  companyRoleId: any;
  userName: any;
  displayTab: string = 'block';
  displayTab1: string = 'none';
  displayFilter: string = 'none';
  activeFilter: string = 'filter-link';
  isFilterOpen: boolean = false;
  displayColumn: string = 'none';
  activeColumn: string = 'column-link';
  activeDefault: string = 'default-link';
  // activeTab: string = 'ui-tab ui-tabs-active ui-state-active';
  activeTab1: string = 'ui-tab ';
  isColumnOpen: boolean = false;
  rweBusinessfilters: RWEBusinessFilters | undefined;
  rweBusinessType: RWEBusinessType[] = [];
  rweServiceOrProduct: RWEServiceOrProduct[] = [];
  rweBusinessSubCatType: RWEBusinessSubCatType[] = [];
  activeTab: string = 'business'; // default tab

  isLoading: boolean = false;   // For spinner
  clients = [
  {
    "productName": "Dana Mishran",
    "category": "Input Business",
    "subCategory": "Herbal Formulations Medicines and supplements",
    "sellingPrice": "40",
    "unit": "Per kg",
    "margin": "10",
    "status": "Enable"
  },
  {
    "productName": "Neem Oil",
    "category": "Input Business",
    "subCategory": "Herbal Formulations Medicines and supplements",
    "sellingPrice": "15",
    "unit": "10 ml",
    "margin": "10",
    "status": "Enable"
  },
  {
    "productName": "Pachmola",
    "category": "Input Business",
    "subCategory": "Herbal Formulations Medicines and supplements",
    "sellingPrice": "30",
    "unit": "No.",
    "margin": "10",
    "status": "Enable"
  },
  {
    "productName": "Masala Bolus",
    "category": "Input Business",
    "subCategory": "Herbal Formulations Medicines and supplements",
    "sellingPrice": "5",
    "unit": "No.",
    "margin": "10",
    "status": "Enable"
  },
  {
    "productName": "Milk Replacer",
    "category": "Input Business",
    "subCategory": "Herbal Formulations Medicines and supplements",
    "sellingPrice": "20",
    "unit": "75-gram pack",
    "margin": "10",
    "status": "Enable"
  },
  {
    "productName": "Liver Tonic",
    "category": "Input Business",
    "subCategory": "Herbal Formulations Medicines and supplements",
    "sellingPrice": "160",
    "unit": "Per Litre",
    "margin": "10",
    "status": "Enable"
  }
];

clients2 = [
  {
    "type": "Input Business",
    "desc": "Input Business",
    "status": "Enable"
  },
  {
    "type": "Output Business",
    "desc": "Output Business",
    "status": "Enable"
  },
  {
    "type": "TGT Services",
    "desc": "TGT Services",
    "status": "Enable"
  }

];


clients3 = [
  {
    "subcatName": "Goat Feed/ Feed Mill",
    "cat": "Input Business",
    "status": "Enable"
  },
  {
    "subcatName": "Kid Nursery",
    "cat": "Input Business",
    "status": "Enable"
  },
  {
    "subcatName": "Livestock Input Shop",
    "cat": "Input Business",
    "status": "Enable"
  },
  {
    "subcatName": "Herbal Formulations Medicines and supplements",
    "cat": "Input Business",
    "status": "Enable"
  },
  {
    "subcatName": "Cold Chain Equipment and tools",
    "cat": "Input Business",
    "status": "Enable"
  },
  {
    "subcatName": "Breeding Buck and AI Services",
    "cat": "Input Business",
    "status": "Enable"
  },
  {
    "subcatName": "Commercial Goat Farming",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Bakrid Buck Farming",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Commercial Desi Poultry Farming",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Goat Dung Manure",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Goat & Chik’s Marketing",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Goat Milk byproducts",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Pashumart Retails Outlet (Input/output)",
    "cat": "Output Business",
    "status": "Enable"
  },
  {
    "subcatName": "Hygienic Mutton and Desi Egg Shop",
    "cat": "Output Business",
    "status": "Enable"
  }
];

  constructor(private route: ActivatedRoute, private menuService: MenuService, private rweBusinessService: rweBusiness, private router: Router) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    this.companyId = userRoleSettings.companyId;
    this.roleId = userRoleSettings.systemRoleId;
    this.companyRoleId = userRoleSettings.companyRoleId;
    this.userName = userRoleSettings.username;


    this.route.params.subscribe((params) => {
      this.companyId = +params['companyid'];
      this.roleId = +params['roleid'];
    });

    this.isLoading = true;

    this.rweBusinessService.getRWEBusinessFilters().subscribe({
      next: (data: RWEBusinessFilters) => {
        this.rweBusinessfilters = data;

        this.rweBusinessType = data.rweBusinessType;
        this.rweBusinessSubCatType = data.rweBusinessSubCatType;
        this.rweServiceOrProduct = data.rweServiceOrProduct;


        // Inject into jsGrid
        $("#MappedGrid").jsGrid("option", "data", this.rweServiceOrProduct).jsGrid("loadData");
        $("#MappedGrid2").jsGrid("option", "data", this.rweBusinessType).jsGrid("loadData");
        $("#MappedGrid3").jsGrid("option", "data", this.rweBusinessSubCatType).jsGrid("loadData");
      },
      error: (err) => {
        console.error('Error fetching filters', err);
      },
      complete: () => {
        this.isLoading = false;  // Hide spinner
      }
    });


    this.updatePath();


    $("#MappedGrid").jsGrid({
      width: "100%",
      padding: "1%",
      height: "auto",
      filtering: false,
      autoload: false,
      loadIndication: false,
      sorting: true,
      paging: true,
      noDataContent: "No Data found",
      pageIndex: 1,

      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",

      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      data: this.clients,

      fields: [
        { title: "Product Name", name: "name", type: "text" },
        { title: "Business Category", name: "businessCategory", type: "text" },
        { title: "Business Sub-Category", name: "businessSubCategory", type: "text" }
      ]
    });

    $("#MappedGrid2").jsGrid({
      width: "100%",
      padding: "1%",
      height: "auto",
      filtering: false,
      autoload: false,
      loadIndication: false,
      sorting: true,
      paging: true,
      noDataContent: "No Data found",
      pageIndex: 1,

      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",

      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      data: this.clients2,

      fields: [
        { title: "Business Category Name", name: "name", type: "text" },
        { title: "Description", name: "description", type: "text" }
      ]
    });

    $("#MappedGrid3").jsGrid({
      width: "100%",
      padding: "1%",
      height: "auto",
      filtering: false,
      autoload: false,
      loadIndication: false,
      sorting: true,
      paging: true,
      noDataContent: "No Data found",
      pageIndex: 1,
      //pageSize: $('#<%=ddl_pagesize.ClientID%>').val(),
      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",
      //pageFirstText: "First",
      // pageLastText: "Last",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      data: this.clients3,

      fields: [
        { title: "Business Sub-Category Name", name: "name", type: "text" },
        { title: "Business Category", name: "businessCategory", type: "text" }
      ]
    });

  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
  updatePath(): void {
    this.menuService.resetMenu();
    this.menuService.updateMenuItems([
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
      }
    ]);
  }
  loadDashboard() {
    //this.companyId
    this.router.navigate(['dashboard/' + this.roleId]);
  }
  openFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    if (this.displayFilter == 'none') {
      this.displayFilter = 'block';
      this.activeFilter = 'filter-link filter-tab-btn';

    }
    else {
      this.displayFilter = 'none';
      this.activeFilter = 'filter-link';
    }
  }
  openColumn() {
    this.isColumnOpen = !this.isColumnOpen;

    if (this.displayColumn == 'none') {
      this.displayColumn = 'block';
      this.activeColumn = 'column-link filter-tab-btn';

    }
    else {
      this.displayColumn = 'none';
      this.activeColumn = 'column-link';
    }
  }

  openDefault() {

    if (this.activeDefault == 'default-link') {

      this.activeDefault = 'default-link default-tab-btn';

    }
    else {

      this.activeDefault = 'default-link';
    }

  }
  toggleTab() {
    if (this.displayTab == 'none') {
      this.displayTab = 'block';
      this.activeTab = 'ui-tab ui-tabs-active ui-state-active';
    }
    else {
      this.displayTab = 'none';
      this.activeTab = 'ui-tab';
    }
    if (this.displayTab1 == 'none') {
      this.displayTab1 = 'block';
      this.activeTab1 = 'ui-tab ui-tabs-active ui-state-active';
    }
    else {
      this.displayTab1 = 'none';
      this.activeTab1 = 'ui-tab';
    }
  }
}
