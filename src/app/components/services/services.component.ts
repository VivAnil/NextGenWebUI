import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ApiServicepillar } from 'src/app/services/api.servicepillar';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  displayTab: string='block';
  displayTab1: string='none';
  displayFilter: string='none';
  activeFilter: string='filter-link';
  isFilterOpen: boolean=false;
  displayColumn: string='none';
  activeColumn: string='column-link';
  activeDefault: string='default-link';
  activeTab: string='ui-tab ui-tabs-active ui-state-active'; 
  activeTab1: string='ui-tab ';
  isColumnOpen: boolean=false;

  serPillarData: any[] = [];
  selectedOption: any; // Holds the selected value

  constructor(private serviceApi: ApiService, private servicePillarApi: ApiServicepillar) { }
  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#MappedGrid').jsGrid({
      width: "100%",
      padding: "1%",
      inserting: false,
      height: "auto",
      filtering: false,
      
      loadIndication: false,
      sorting: true,
      paging: true,
      editing: true,
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

     // data: this.getDummyData(),
       autoload: true,

     controller: {
       loadData: () => {
         return this.serviceApi.getData().toPromise();
       },
     },
      fields: [
        { title: "Service Id", name: "id", type: "text", validate: "required", css: "width6em text-align-center" },
        { title: "Service Pilalr Id", name: "servicePillarId", type: "text", validate: "required", css: "width6em text-align-center"  },
        { title: "Service Name", name: "serviceName", type: "text", css: "width14em" },
        { title: "Service Pillar Name", name: "servicePillarName", type: "text", css: "width14em" },
        { title: "Sevice Rate", name: "serviceRate", type: "text", css: "text-align-center width6em" },
        { title: "Service Worth", name: "serviceWorth", type: "text", css: "text-align-center width6em" },
        { title: "Status", name: "status", type: "text", css: "text-align-center width6em" },
        { title: "Single Time / Multiple Times", name: "singleTimeAvailability", type: "text", css: "text-align-center width6em" },
        { title: "Only Through SP", name: "spOnly", type: "text", css: "text-align-center width6em" },
        // {
        //   title: "Action", itemTemplate: function (value, item) {
        //     return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addService'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //   }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
        // }
      ]
    });

    $('#MappedGrid2').jsGrid({
      width: "100%",
      padding: "1%",
      height: "auto",
      filtering: false,
      //autoload: false,
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

      //data: this.getDummyData2(),
	   autoload: true,

     controller: {
       loadData: () => {
         return this.servicePillarApi.getData().toPromise();
       },
      },
      fields: [
        { title: "Service Type Name", name: "name", type: "text", validate: "required", css: "width14em" },
        { title: "Description", name: "description", type: "text", css: "width14em" },
        { title: "Status", name: "status", type: "text", css: "text-align-center" },
        // {
        //   title: "Action", itemTemplate: function (value, item) {
        //     return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addOrg'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //   }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
        // }
      ]
    });
  }

  getDummyData() {
    return [
      {
        "type": "Digital Service",
        "name": "PAN Card",
        "rate": "50",
        "value": "100",
        "status": "Enable",
        "time": "Single",
        "throughSP": "Enabled"
      },
      {
        "type": "Digital Service",
        "name": "Aadhar Card Card",
        "rate": "70",
        "value": "200",
        "status": "Enable",
        "time": "Multiple",
        "throughSP": "Enabled"
      },
      {
        "type": "Financial Service",
        "name": "Bank Loan",
        "rate": "100",
        "value": "300",
        "status": "Enable",
        "time": "Single",
        "throughSP": "Disabled"
      },
      {
        "type": "Financial Service",
        "name": "Cash Withdrawl",
        "rate": "20",
        "value": "50",
        "status": "Enable",
        "time": "Multiple",
        "throughSP": "Disabled"
      },
      {
        "type": "Government Compliances",
        "name": "Ration Card",
        "rate": "70",
        "value": "150",
        "status": "Enable",
        "time": "Single",
        "throughSP": "Enabled"
      },
      {
        "type": "Government Compliances",
        "name": "Pension",
        "rate": "250",
        "value": "600",
        "status": "Enable",
        "time": "Single",
        "throughSP": "Enabled"
      }
    ];
  }
  getDummyData2() {
    return [
      {
        "type": "Digital Service",
        "desc": "Digital Service",
        "status": "Enable"
    },
    {
        "type": "Financial Service",
        "desc": "Financial Service",
        "status": "Enable"
    },
    {
        "type": "Govt Compliances",
        "desc": "Govt Compliances",
        "status": "Enable"
    },
    {
        "type": "Facilitation Linkages",
        "desc": "Facilitation Linkages",
        "status": "Enable"
    }
    ];
  }
  toggleTab(){
    if(this.displayTab=='none') 
      {
        this.displayTab='block';
        this.activeTab = 'ui-tab ui-tabs-active ui-state-active';
      }
    else 
      {
        this.displayTab='none';
        this.activeTab = 'ui-tab';
      }
    if(this.displayTab1=='none') 
      {
        this.displayTab1='block';
        this.activeTab1 = 'ui-tab ui-tabs-active ui-state-active';
      }
    else 
      {
        this.displayTab1='none';
        this.activeTab1 = 'ui-tab';
      }
  }
  ngOnInit(): void {
  }

  openFilter() {
    this.isFilterOpen = !this.isFilterOpen;    
    if(this.displayFilter=='none') 
      {
        this.displayFilter='block';
        this.activeFilter = 'filter-link filter-tab-btn';
        
    }
    else 
    {
    this.displayFilter='none';
    this.activeFilter = 'filter-link';
    }
  }
  openColumn() {
    this.isColumnOpen = !this.isColumnOpen;
    
    if(this.displayColumn=='none') 
      {
        this.displayColumn ='block';
        this.activeColumn = 'column-link filter-tab-btn';
       
    }
    else 
    {
    this.displayColumn ='none';
    this.activeColumn = 'column-link';
    }
  }

  openDefault(){

    if(this.activeDefault=='default-link') 
      {
        
        this.activeDefault = 'default-link default-tab-btn';
       
    }
    else 
    {
    
    this.activeDefault = 'default-link';
    }

  }

  onSelectionChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('Selected Option ID:', selectedId);
    this.selectedOption = selectedId;

  }

  private loadSPData(): void {
    this.serviceApi.getSerPillarData().subscribe(
      (data) => {
        this.serPillarData = data;
      },
      (error) => {
        console.error('Error loading dropdown data:', error);
      }
    );
  }

   newService(){
    this.loadSPData();
  }

}
