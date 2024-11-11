import { Component, OnInit } from '@angular/core';
declare var $: any; // Import jQuery

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  displayTab: string = 'block';
  displayTab1: string = 'none';

  constructor() { }

  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
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

      data: this.getClients(),

      fields: [
        { title: "ID", name: "ID", type: "text", validate: "required" },
        { title: "App User Profile", name: "appuserprofile", type: "text", validate: "required", css: "width14em" },
        { title: "First Name", name: "firstName", type: "text", css: "width14em" },
        { title: "Last Name", name: "lastName", type: "text", css: "width14em" },
        { title: "DOB", name: "dob", type: "text", validate: "required", css: "width14em" },
        { title: "Sex", name: "sex", type: "text", css: "width14em" },
        { title: "Mobile No.", name: "mobile", type: "text", css: "width14em" },
        { title: "Email Id", name: "email", type: "text", validate: "required", css: "width14em" },
        { title: "Project ID", name: "projectId", type: "text", css: "width14em" },
        { title: "State", name: "state", type: "text", css: "width14em" },
        { title: "District", name: "district", type: "text", css: "width14em" },
        { title: "Gram Panchayat", name: "gp", type: "text", validate: "required", css: "width14em" },
        { title: "Village", name: "village", type: "text", css: "width14em" },
        { title: "Block", name: "block", type: "text", css: "width14em" },
        { title: "Pin Code", name: "pincode", type: "text", css: "width14em" },
        { title: "Profile Picture", name: "profilePic", type: "text", css: "width14em" },
        //{
        //  title: "Action", itemTemplate: function (value, item) {
        //    return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addOrg'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //  }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
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

      data: this.getClients2(),

      fields: [
        { title: "App User Profile Type", name: "appuser", type: "text", validate: "required", css: "width14em" },
        { title: "Type of Built-in User", name: "builtinuser", type: "text", css: "width14em" },
        { title: "Description", name: "desc", type: "text", css: "text-align-center width14em"},
        //{
        //  title: "Action", itemTemplate: function (value, item) {
        //    return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addOrg'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //  }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
        //}
      ]
    });
        //RefreshFilterColumns();
  }
    getClients2() {
      return [
        {
          "appuser": "Project Officer",
          "builtinuser": "Project Incharge",
          "desc": "Project Incharge user type"
        },
        {
          "appuser": "District Officer",
          "builtinuser": "District Coordinator",
          "desc": "District Coordinator user type"
        },
        {
          "appuser": "Block Officer",
          "builtinuser": "Block Coordinator",
          "desc": "Block Coordinator user type"
        }
      ];
    }
    getClients() {
      return [
        {


          "ID": "1",
          "appuserprofile": "Project Officer",
          "profilePic": "profile.jpg",
          "projectId": "Krisarthak",
          "firstName": "Raman",
          "lastName": "Verma",
          "mobile": "9873839300",
          "dob": "10-Jan-1980",
          "block": "Noida",
          "village": "Sarfabad",
          "state": "Uttar Pradesh",
          "district": "Noida",
          "email": "aman@defindia.org",
          "sex": "Male",
          "gp": "Gram Panchayat",
          "pincode": "201301"
        },
        {

          "appuserprofile": "District Officer",
          "ID": "2",
          "profilePic": "profile.jpg",
          "projectId": "Smartpur",
          "firstName": "Kumar",
          "lastName": "Gaurav",
          "mobile": "5366627472",
          "dob": "20-Feb-1985",
          "block": "Noida",
          "village": "Sarfabad",
          "state": "Uttar Pradesh",
          "district": "Noida",
          "email": "kumar@defindia.net",
          "sex": "Male",
          "gp": "Gram Panchayat",
          "pincode": "201301"
        },
        {
          "appuserprofile": "Project Officer",
          "ID": "3",
          "profilePic": "profile.jpg",
          "projectId": "Smartpur",
          "firstName": "Rani",
          "lastName": "Bharti",
          "mobile": "976546373",
          "dob": "20-Feb-1980",
          "block": "Noida",
          "village": "Sarfabad",
          "state": "Uttar Pradesh",
          "district": "Noida",
          "email": "rani@test.com",
          "sex": "Female",
          "gp": "Gram Panchayat",
          "pincode": "201301"
        },
        {
          "appuserprofile": "Block Officer",
          "ID": "4",
          "profilePic": "profile.jpg",
          "projectId": "Smartpur",
          "firstName": "Anil",
          "lastName": "Bhisht",
          "mobile": "976546373",
          "dob": "20-Feb-1980",
          "block": "Noida",
          "village": "Sarfabad",
          "state": "Uttar Pradesh",
          "district": "Noida",
          "email": "rani@test.com",
          "sex": "Female",
          "gp": "Gram Panchayat",
          "pincode": "201301"
        }

      ];
    }

  ngOnInit(): void {
  }

  toggleTab() {
    if (this.displayTab == 'none') this.displayTab = 'block';
    else this.displayTab = 'none';
    if (this.displayTab1 == 'none') this.displayTab1 = 'block';
    else this.displayTab1 = 'none';
  }
}
