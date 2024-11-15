import { Component, OnInit } from '@angular/core';
declare var $: any; // Import jQuery
// import * as $ from 'jquery';
import 'jstree';
@Component({
  selector: 'app-companyusermaster',
  templateUrl: './companyusermaster.component.html',
  styleUrls: ['./companyusermaster.component.css']
})
export class CompanyusermasterComponent implements OnInit {
  displayFilter: string = 'none';
  activeFilter: string = 'filter-link';
  isFilterOpen: boolean = false;
  displayColumn: string = 'none';
  activeColumn: string = 'column-link';
  activeDefault: string = 'default-link';
  activeTab: string = 'ui-tab ui-tabs-active ui-state-active';
  activeTab1: string = 'ui-tab ';
  isColumnOpen: boolean = false;
  displayTab1: string = 'none';
  displayTab: string = 'block';
  constructor() { }
  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {

    $("#html1").jstree({
      "checkbox": {
        "keep_selected_style": false
      },

      "plugins": ["checkbox"]
    });
    this.initJsGrid();
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
  initJsGrid() {
    $('#MappedGrid').jsGrid({
      width: "100%",
      padding: "1%",
      inserting: false,
      height: "auto",
      filtering: false,
      autoload: false,
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

      fields: [
        { title: "Profile Name", name: "profilename", type: "text", validate: "required", css: "width14em" },
        { title: "System User Type", name: "systemusertype", type: "text", css: "width14em" }
        //   {
        //     title: "Action", itemTemplate: function (value, item) {
        //         return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_adduser'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //     }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
        // }
      ]
    });

  }

  getDummyData() {
    return [
      {
        "profilename": "Project Coordinator",
        "systemusertype": "Project Manager"
      },
      {
        "profilename": "Admin",
        "systemusertype": "Administrator"
      },
      {
        "profilename": "State Coordinator",
        "systemusertype": "State Coordinator"
      },
      {
        "profilename": "District Coordinator",
        "systemusertype": "District Coordinator"
      },
      {
        "profilename": "Block Coordinator",
        "systemusertype": "Block Coordinator"
      },
      {
        "profilename": "Beneficiary",
        "systemusertype": "Beneficiary"
      }
    ];
  }
}

