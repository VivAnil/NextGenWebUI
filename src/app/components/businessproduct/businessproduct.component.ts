import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { RWEBusinessFilters, rweBusiness } from '../../services/rweBusiness.service';
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

  rweBusinessfilters: RWEBusinessFilters | undefined;

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

    this.rweBusinessService.getRWEBusinessFilters().subscribe({
      next: (data) => {
        this.rweBusinessfilters = data;
        console.log('Filters:', this.rweBusinessfilters);
      },
      error: (err) => console.error('Error fetching rwe business filters:', err)
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
      //pageSize: $('#<%=ddl_pagesize.ClientID%>').val(),
      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",
      //pageFirstText: "First",
      // pageLastText: "Last",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      data: this.clients,

      fields: [
        { title: "Product Name", name: "productName", type: "text", validate: "required", css: "width14em" },
        { title: "Business Category", name: "category", type: "text", css: "width14em" },
        { title: "Business Sub-Category", name: "subCategory", type: "text", css: "text-align-center" },
        //{ title: "Selling Price", name: "sellingPrice", type: "text", css: "text-align-center" },
        //{ title: "Unit", name: "unit", type: "text", css: "text-align-center" },
        //{ title: "Margin", name: "margin", type: "text", css: "text-align-center" },
        //{ title: "Status", name: "status", type: "text", css: "text-align-center" },
        //{
        //  title: "Action", itemTemplate: function (value:any, item:any) {
        //    return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addService'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //  }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
        //}
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
      //pageSize: $('#<%=ddl_pagesize.ClientID%>').val(),
      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",
      //pageFirstText: "First",
      // pageLastText: "Last",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      data: this.clients2,

      fields: [
        { title: "Business Category Name", name: "type", type: "text", validate: "required", css: "width14em" },
        { title: "Description", name: "type", type: "text", css: "width14em" },
        //{ title: "Status", name: "status", type: "text", css: "text-align-center" }
        //{
        //  title: "Action", itemTemplate: function (value:any, item:any) {
        //    return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addOrg'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //  }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
        //}
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
        { title: "Business Sub-Category Name", name: "subcatName", type: "text", validate: "required", css: "width14em" },
        { title: "Business Category", name: "cat", type: "text", css: "width14em" },
        //{ title: "Status", name: "status", type: "text", css: "text-align-center" },
        //{
        //  title: "Action", itemTemplate: function (value:any, item:any) {
        //    return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addOrg'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //  }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
        //}
      ]
    });

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
}
