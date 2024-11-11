import { Component, OnInit } from '@angular/core';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  displayTab: string='block';
  displayTab1: string='none';
  constructor() { }
  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#MappedGrid').jsGrid({
      width: "100%",
      padding: "1%",
      inserting: true,
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
        { title: "Service Pillar", name: "type", type: "text", validate: "required", css: "width14em" },
        { title: "Service Name", name: "name", type: "text", css: "width14em" },
        { title: "Sevice Rate", name: "rate", type: "text", css: "text-align-center" },
        { title: "Service Worth", name: "value", type: "text", css: "text-align-center" },
        { title: "Status", name: "status", type: "text", css: "text-align-center" },
        { title: "Single Time / Multiple Times", name: "time", type: "text", css: "text-align-center" },
        { title: "Only Through SP", name: "throughSP", type: "text", css: "text-align-center" },
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

      data: this.getDummyData2(),

      fields: [
        { title: "Service Type Name", name: "type", type: "text", validate: "required", css: "width14em" },
        { title: "Description", name: "desc", type: "text", css: "width14em" },
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
    if(this.displayTab=='none') this.displayTab='block';
    else this.displayTab='none';
    if(this.displayTab1=='none') this.displayTab1='block';
    else this.displayTab1='none';
  }
  ngOnInit(): void {
  }

}
