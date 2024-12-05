import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-allbeneficiaries',
  templateUrl: './allbeneficiaries.component.html',
  styleUrls: ['./allbeneficiaries.component.css']
})
export class AllbeneficiariesComponent implements OnInit {

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
        {
          title: "Beneficiary ID", itemTemplate: function (value: any, item: any) {
              return "<div><img src='../../assets/images/"+item.profilepic+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.beneficiaryId+" </div>";
          }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
        },        
        { title: "Beneficiary Name", name: "beneficiaryName", type: "text", css: "width14em text-align-center" },
        { title: "Date of Registration", name: "dor", type: "text", css: "text-align-center width14em" },
        { title: "Father's Name", name: "fathersName", type: "text", css: "width14em text-align-center" },
        { title: "Date Of Birth", name: "dob", type: "text", css: "text-align-center width14em" },
        { title: "Age", name: "age", type: "number", css: "text-align-center width6em" },
        { title: "Gender", name: "gender", type: "text", css: "text-align-center width6em" },
        { title: "Mobile No.", name: "mobile", type: "text", css: "text-align-center width10em" },
        { title: "Email", name: "email", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Project Name", name: "projectName", type: "text", validate: "required", css: "text-align-center width14em" },
        { title: "State", name: "state", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "District", name: "district", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Block", name: "block", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Village", name: "village", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Gram Panchayat", name: "gp", type: "text", validate: "required", css: "text-align-center width12em" },
        { title: "Pin Code", name: "pin", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Address", name: "address", type: "text", validate: "required", css: "text-align-center width14em" },
        { title: "Economic Status (BPL/APL)", name: "economicStatus", type: "text", validate: "required", css: "text-align-center width14em" },
        { title: "PAN Card", name: "pan", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Aadhar Card", name: "aadhar", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Total - Digital Services", name: "totalDigitalServices", type: "text", validate: "required", css: "text-align-center width14em" },
        { title: "Bank Loan", name: "bankLoan", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Cash Withdrawl", name: "cash", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Total - Financial Services", name: "totalFinServices", type: "text", validate: "required", css: "text-align-center width14em" },
        { title: "Ration Card", name: "rationCard", type: "text", validate: "required", css: "text-align-center width10em" },
        { title: "Pension", name: "village", type: "pension", validate: "required", css: "text-align-center width10em" },
        { title: "Total - Govt Compliances", name: "toalGovtComp", type: "text", validate: "required", css: "text-align-center width14em" },
      
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
        "beneficiaryId": "BN-0001",
        "profilepic": "bn1.jpg",
        "beneficiaryName": "Rehana Khatoon",
        "dor": "03-10-2023",
        "fathersName": "Amir Khan",
        "dob": "27-05-1980",
        "age": "25",
        "gender": "Female",
        "mobile": "9765467379",
        "email": "abc@gmail.com",
        "projectName": "Krisarthak",
        "state": "Assam",
        "district": "Nagoan",
        "block": "Block 1",
        "village": "Rampura",
        "gp": "Gram Panchayat",
        "pin": "230090",
        "address": "Nagaon, Assam",
        "economicStatus": "BPL",
        "pan": "30",
        "aadhaar": "20",
        "totalDigitalServices": "50",
        "bankLoan": "10",
        "cash": "100",
        "totalFinServices": "110",
        "ration": "20",
        "pension": "10",
        "toalGovtComp": "30"
      },
      {
        "beneficiaryId": "BN-0002",
        "profilepic": "bn2.jpg",
        "beneficiaryName": "Manoj Kumar",
        "dor": "23-10-2023",
        "fathersName": "Somesh Kumar Singh",
        "dob": "20-02-1982",
        "age": "44",
        "gender": "Male",
        "mobile": "	9730230922",
        "email": "abc@gmail.com",
        "projectName": "Krisarthak",
        "state": "Assam",
        "district": "Nagoan",
        "block": "Block 5",
        "village": "Rampura",
        "gp": "Gram Panchayat",
        "pin": "230090",
        "address": "Nagaon, Assam",
        "economicStatus": "BPL",
        "pan": "10",
        "aadhaar": "120",
        "totalDigitalServices": "130",
        "bankLoan": "8",
        "cash": "92",
        "totalFinServices": "100",
        "ration": "10",
        "pension": "10",
        "toalGovtComp": "20"
      },
      {
          "beneficiaryId": "BN-0003",
          "profilepic": "bn3.jpg",
           "beneficiaryName": "Bharti Kumari",
           "dor": "28-09-2024",
           "fathersName": "	Akshay Kumar",
           "dob": "27-05-1980",
           "age": "44",
           "gender": "Female",
           "mobile": "	9765467379",
           "email": "abc@gmail.com",
           "projectName": "Krisarthak",
           "state": "Assam",
           "district": "Nagoan",
           "block": "Block 9",
           "village": "Rampura",
           "gp": "Gram Panchayat",
           "pin": "230090",
           "address": "Nagaon, Assam",
           "economicStatus": "BPL",
           "pan": "100",
           "aadhaar": "120",
           "totalDigitalServices": "220",
           "bankLoan": "50",
           "cash": "100",
           "totalFinServices": "150",
           "ration": "100",
           "pension": "10",
           "toalGovtComp": "110"
         
      },
     
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
