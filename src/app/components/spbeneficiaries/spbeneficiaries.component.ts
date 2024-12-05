import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-spbeneficiaries',
  templateUrl: './spbeneficiaries.component.html',
  styleUrls: ['./spbeneficiaries.component.css']
})
export class SpbeneficiariesComponent implements OnInit {

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
   // jQuery("div#allProjectGrid").empty();
    this.initJsGrid();
  }
  initJsGrid() {
   $('#allProjectGrid').jsGrid({
   
      width: "100%",
      padding: "1%",
      inserting: false,
      height: "auto",
      filtering: false,
      autoload: true,
      cache: false,
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
      

    //  controller: {
    //    loadData: () => {
    //      return this.serviceApi.getData().toPromise();
    //    },
    //  },
      fields: [
        {
          title: "SP ID", itemTemplate: function (value: any, item: any) {
              return "<div><img src='../../assets/images/"+item.profilepic+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.spId+" </div>";
          }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive text-align-c"
        },
        { title: "SP Name", name: "spName", type: "text", css: "width14em" },
        { title: "Father's Name", name: "fathersName", type: "text", css: "width14em" },
        { title: "Date Of Birth", name: "dob", type: "text", css: "text-align-c" },
        { title: "Age", name: "age", type: "number", css: "text-align-c" },
        { title: "Gender", name: "gender", type: "text", css: "text-align-c" },
        { title: "Mobile No.", name: "mobile", type: "text", css: "text-align-c" },
        { title: "Email", name: "email", type: "text", validate: "required", css: "text-align-left" },
        { title: "Project Name", name: "projectName", type: "text", validate: "required", css: "width14em" },
        { title: "State", name: "state", type: "text", validate: "required", css: "text-align-c" },
        { title: "District", name: "district", type: "text", validate: "required", css: "text-align-c" },
        { title: "Block", name: "block", type: "text", validate: "required", css: "text-align-c" },
        { title: "Village", name: "village", type: "text", validate: "required", css: "" },
        { title: "Gram Panchayat", name: "gp", type: "text", validate: "required", css: "" },
        { title: "Pin Code", name: "pin", type: "text", validate: "required", css: "text-align-c" },
        { title: "Address", name: "address", type: "text", validate: "required", css: "width14em" },
        { title: "Total Unique Beneficiaries", name: "totalUniqueBen", type: "text", validate: "required", css: "text-align-c" },
        { title: "PAN Card", name: "pan", type: "text", validate: "required", css: "text-align-c back-digital" },
        { title: "Aadhar Card", name: "aadhar", type: "text", validate: "required", css: "text-align-c back-digital" },
        { title: "Total - Digital Services", name: "totalDigitalServices", type: "text", validate: "required", css: "text-align-c back-digital" },
        { title: "Bank Loan", name: "bankLoan", type: "text", validate: "required", css: "text-align-c back-financial" },
        { title: "Cash Withdrawl", name: "cash", type: "text", validate: "required", css: "text-align-c back-financial" },
        { title: "Total - Financial Services", name: "totalFinServices", type: "text", validate: "required", css: "text-align-c back-financial" },
        { title: "Ration Card", name: "rationCard", type: "text", validate: "required", css: "text-align-c back-government" },
        { title: "Pension", name: "village", type: "pension", validate: "required", css: "text-align-c back-government" },
        { title: "Total - Govt Compliances", name: "toalGovtComp", type: "text", validate: "required", css: "text-align-c back-government" },
        { title: "Revenue By Services (A)", name: "revenueByServices", type: "text", validate: "required", css: "text-align-c" },
        { title: "Revenue By Incentives (b)", name: "revenueByIncentives", type: "text", validate: "required", css: "text-align-c back-red" },
        { title: "Total Services Worth", name: "totalServicesWorth", type: "text", validate: "required", css: "text-align-c" },
        // {
        //   title: "Action", itemTemplate: function (value, item) {
        //     return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addService'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //   }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
        // }
      ]
    });

   
  }

  getDummyData() {
    console.log('getDummyData');
    return [
      {
        "spId": "SP-1",
        "spName": "Suman Kumari",
        "profilepic": "sp1.jpg",
        "fathersName": "Somesh Singh",
        "dob": "27-05-1980",
        "age": "44",
        "gender": "Female",
        "mobile": "9765467379",
        "email": "abc@gmail.com",
        "projectName": "Digital Didi",
        "state": "Assam",
        "district": "Nagoan",
        "block": "Block 1",
        "village": "Rampura",
        "gp": "Gram Panchayat",
        "pin": "230090",
        "address": "Nagaon, Assam",
        "totalUniqueBen": "2",
        "pan": "30",
        "aadhaar": "20",
        "totalDigitalServices": "50",
        "bankLoan": "10",
        "cash": "100",
        "totalFinServices": "110",
        "ration": "20",
        "pension": "10",
        "toalGovtComp": "30",
        "revenueByServices":"12,400",
        "revenueByIncentives": "4,600",
        "totalServicesWorth":"17,000"
      },
      {
       "spId": "SP-2",
        "spName": "Anuradha Singh",
        "profilepic": "sp2.jpg",
        "fathersName": "Father Singh",
        "dob": "09-11-1992",
        "age": "32",
        "gender": "Female",
        "mobile": "7965467379",
        "email": "abc@gmail.com",
        "projectName": "Smartpur",
        "state": "Assam",
        "district": "Nagoan",
        "block": "Block 1",
        "village": "Rampura",
        "gp": "Gram Panchayat",
        "pin": "230090",
        "address": "Nagaon, Assam",
        "totalUniqueBen": "8",
        "pan": "15",
        "aadhaar": "18",
        "totalDigitalServices": "33",
        "bankLoan": "5",
        "cash": "23",
        "totalFinServices": "28",
        "ration": "75",
        "pension": "15",
        "toalGovtComp": "90",
        "revenueByServices":"10,300",
        "revenueByIncentives": "8,100",
        "totalServicesWorth":"18,400"
      },
      {
        "spId": "SP-3",
        "spName": "Amar Srivastava",
        "profilepic": "sp3.jpg",
        "fathersName": "Father Srivastava",
        "dob": "07-08-1984",
        "age": "40",
        "gender": "Male",
        "mobile": "9898101028",
        "email": "amar@gmail.com",
        "projectName": "Krisarthak",
        "state": "Bihar",
        "district": "Patna",
        "block": "R Block",
        "village": "Patna",
        "gp": "",
        "pin": "800001",
        "address": "Patna, Bihar",
        "totalUniqueBen": "12",
        "pan": "16",
        "aadhaar": "20",
        "totalDigitalServices": "36",
        "bankLoan": "20",
        "cash": "10",
        "totalFinServices": "30",
        "ration": "5",
        "pension": "45",
        "toalGovtComp": "50",
        "revenueByServices":"10,000",
        "revenueByIncentives": "4,200",
        "totalServicesWorth":"14,200"
      },
     
    ];
  }
  ngOnInit(): void {
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
