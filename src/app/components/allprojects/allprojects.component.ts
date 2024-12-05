import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.css']
})
export class AllprojectsComponent implements OnInit {
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
  constructor(private serviceApi: ApiService) { }
  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#allProjectGrid').jsGrid({
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

     data: this.getDummyData(),
       autoload: true,

    //  controller: {
    //    loadData: () => {
    //      return this.serviceApi.getData().toPromise();
    //    },
    //  },
      fields: [
        { title: "Project Id", name: "projectId", type: "number", validate: "required", css: "text-align-c" },
        { title: "Project Name", name: "projectName", type: "text", css: "width14em" },
        { title: "Total Unique Beneficiaries", name: "totalUniqueBen", type: "number", css: "text-align-c" },
        { title: "Total No. Of SPs", name: "totalSP", type: "number", css: "text-align-c width6em" },
        { title: "Total No. Of Services", name: "totalServices", type: "number", css: "text-align-c width6em" },
        { title: "Revenue By Services (A)", name: "revenueByServices", type: "text", css: "text-align-c width6em" },
        { title: "Revenue By Incentives (B)", name: "revenueByIncentives", type: "text", css: "text-align-c width6em" },
        { title: "Total Services Worth", name: "totalServicesWorth", type: "text", validate: "required", css: "text-align-c" },
        {
          title: "Action", name :"action", itemTemplate:"<div class='text-align-center'><a class='border-none color-black margin-right-10px' title='View Project Analytics' type='button' href='projectanalytics.html' ><i class='fa fa-area-chart'></i></a> <a class='border-none color-black' title='View Project Details' type='button' href='viewprojectdetails.html' ><i class='fa fa-eye' title='View Project Details'></i></a></div>", type: "text", sorting: false, editing: false, filtering: false, css: "inactive"
                    
        }
        // {
        //   title: "Action", itemTemplate: function (value, item) {
        //     return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addService'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //   }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
        // }
      ]
    });

   
  }

  getDummyData() {
    return [
      {
        "projectId": "PRO-0001",
        "projectName": "Smartpur",
        "totalUniqueBen": "5",
        "totalSP": "30",
        "totalServices": "15,000",
        "revenueByServices": "9,500",
        "revenueByIncentives": "5,500",
        "totalServicesWorth": "2,500"
      },
      {
        "projectId": "PRO-0002",
        "projectName": "Krisarthak",
        "totalUniqueBen": "5",
        "totalSP": "30",
        "totalServices": "10,000",
        "revenueByServices": "8,500",
        "revenueByIncentives": "1,500",
        "totalServicesWorth": "1,5000"
      },
      {
        "projectId": "PRO-0003",
        "projectName": "Digtal Summit",
        "totalUniqueBen": "18",
        "totalSP": "5",
        "totalServices": "15,000",
        "revenueByServices": "9,500",
        "revenueByIncentives": "5,500",
        "totalServicesWorth": "2,500"
      },
      {
        "projectId": "PRO-0004",
        "projectName": "Green Prakriya",
        "totalUniqueBen": "15",
        "totalSP": "25",
        "totalServices": "15,000",
        "revenueByServices": "9,500",
        "revenueByIncentives": "5,500",
        "totalServicesWorth": "2,500"
      },
      {
        "projectId": "PRO-0005",
        "projectName": "Smartpur",
        "totalUniqueBen": "5",
        "totalSP": "30",
        "totalServices": "25,000",
        "revenueByServices": "19,500",
        "revenueByIncentives": "5,500",
        "totalServicesWorth": "25,500"
      },
      {
        "projectId": "PRO-0006",
        "projectName": "Krisarthak",
        "totalUniqueBen": "5",
        "totalSP": "30",
        "totalServices": "15,000",
        "revenueByServices": "9,500",
        "revenueByIncentives": "5,500",
        "totalServicesWorth": "2,500"
      }
    ];
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
}
