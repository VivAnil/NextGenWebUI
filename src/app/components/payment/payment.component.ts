import { Component, OnInit } from '@angular/core';
declare var $: any; // Import jQuery
@Component({
        selector: 'app-payment',
        templateUrl: './payment.component.html',
        styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
        displayTab: string = 'block';
        displayTab1: string = 'none';
        displayFilter: string = 'none';
        activeFilter: string = 'filter-link';
        isFilterOpen: boolean = false;
        displayColumn: string = 'none';
        activeColumn: string = 'column-link';
        activeDefault: string = 'default-link';
        activeTab: string = 'ui-tab ui-tabs-active ui-state-active';
        activeTab1: string = 'ui-tab ';
        isColumnOpen: boolean = false;

        constructor() { }
        ngAfterViewInit(): void {
                this.initJsGrid();
                this.initJsGridUniqueBeneficiaries();
        }
        initJsGridUniqueBeneficiaries(){
                $('#allBeneficiaryGrid').jsGrid({
                  width: "100%",
                  padding: "1%",
                  inserting: false,
                  height: "auto",
                  filtering: false,      
                  loadIndication: false,
                  sorting: true,
                  paging: false,
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
            
                 data: this.getDummyDataBeneficiary(),
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
                    { title: "PAN Card", name: "pan", type: "text", validate: "required", css: "back-digital text-align-center width10em" },
                    { title: "Aadhar Card", name: "aadhar", type: "text", validate: "required", css: "back-digital text-align-center width10em" },
                    { title: "Total - Digital Services", name: "totalDigitalServices", type: "text", validate: "required", css: "back-digital text-align-center width14em" },
                    { title: "Bank Loan", name: "bankLoan", type: "text", validate: "required", css: "back-financial text-align-center width10em" },
                    { title: "Cash Withdrawl", name: "cash", type: "text", validate: "required", css: "back-financial text-align-center width10em" },
                    { title: "Total - Financial Services", name: "totalFinServices", type: "text", validate: "required", css: "back-financial text-align-center width14em" },
                    { title: "Ration Card", name: "rationCard", type: "text", validate: "required", css: "back-government text-align-center width10em" },
                    { title: "Pension", name: "pension", type: "pension", validate: "required", css: "back-government text-align-center width10em" },
                    { title: "Total - Govt Compliances", name: "toalGovtComp", type: "text", validate: "required", css: "back-government text-align-center width14em" },
                  
                    // {
                    //   title: "Action", itemTemplate: function (value, item) {
                    //     return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addService'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
                    //   }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
                    // }
                  ]
                });
            
               
              }

        getDummyDataBeneficiary(){
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
                    "pan": "1",
                    "aadhar": "",
                    "totalDigitalServices": "1",
                    "bankLoan": "1",
                    "cash": "",
                    "totalFinServices": "1",
                    "rationCard": "1",
                    "pension": "",
                    "toalGovtComp": "1"
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
                    "pan": "",
                    "aadhar": "1",
                    "totalDigitalServices": "1",
                    "bankLoan": "1",
                    "cash": "",
                    "totalFinServices": "1",
                    "rationCard": "1",
                    "pension": "",
                    "toalGovtComp": "1"
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
                       "pan": "",
                       "aadhar": "1",
                       "totalDigitalServices": "1",
                       "bankLoan": "2",
                       "cash": "",
                       "totalFinServices": "2",
                       "rationCard": "1",
                       "pension": "",
                       "toalGovtComp": "1"
                     
                  },
                 
                ];
              }

        initJsGrid() {
                $('#MappedGrid1').jsGrid({
                        width: "100%",
                        padding: "1%",
                        inserting: false,
                        height: "auto",
                        filtering: false,
                        autoload: false,
                        loadIndication: false,
                        sorting: true,
                        paging: true,
                        editing: false,
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
                                {
                                        title: "Select All", align: "center", sorting: false, itemTemplate: function (value: any, item: any) {
                                           
                                                return $("<input>").attr('type', 'checkbox').on('change', function () {});                            
                
                                        }, headerTemplate: function (value: any, item: any) {
                                            return $("<div align='center'>").append("Select All ").append($("<br />")).append($("<input>").attr('type', 'checkbox').on('click', function () {
                                                
                                            })
                                            );
                                        },  type: "text", css: "active checked_class"
                                },
                                {
                                        title: "SP ID", itemTemplate: function (value: any, item: any) {
                                            return "<div><img src='../../assets/images/"+item.profilepic+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.id+" </div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
                                },
                                { title: "SP Name", name: "spName", type: "text", css: "width14em" },
                                { title: "Total Unique Beneficiaries", itemTemplate: function (value: any, item: any) {
                                            return "<div class='text-align-center'><button class='border-none btn-blck' title='' type='button' data-bs-toggle='modal' data-bs-target='#modal_view_ben_details'>"+item.uniqueBeneficiaries+"</button></div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive"
                                },                                
                                { title: "Non-Incentivized Services (A)", name: "nonIBeneficiaries", type: "text", css: "text-align-center" },
                                { title: "Incentivized Services (B)", name: "iBeneficiaries", type: "text", css: "text-align-center " },
                                { title: "Total No of  Services (A+B)", name: "totalServices", type: "text", css: "text-align-center" },
                                { title: "Revenue By Services (C)", name: "revenueByServcies", type: "text", css: "text-align-center" },
                                { title: "Revenue By Incentives (D)", name: "revenueByIncentives", type: "text", css: "text-align-center back-red" },
                                { title: "Total Revenue (C+D)", name: "totalRevenue", type: "text", css: "text-align-center" },                                
                                {
                                  title: "Action", itemTemplate: function (value: any, item: any) {
                                     return "<div class='text-align-center'><button class='border-none' title='View SP Payment Details' type='button' data-bs-toggle='modal' data-bs-target='#modal_view_details'><i class='fa fa-eye' title='View SP Payment Details'></i></button> <button class='border-none' title='Process Payment' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-spinner' title='Process Payment'></i></button></div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
                                 }
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
                                {
                                        title: "Select All", align: "center", sorting: false, itemTemplate: function (value: any, item: any) {
                                           
                                                return $("<input>").attr('type', 'checkbox').on('change', function () {});                            
                
                                        }, headerTemplate: function (value: any, item: any) {
                                            return $("<div align='center'>").append("Select All ").append($("<br />")).append($("<input>").attr('type', 'checkbox').on('click', function () {
                                                
                                            })
                                            );
                                        },  type: "text", css: "active checked_class"
                                },
                                {
                                        title: "SP ID", itemTemplate: function (value: any, item: any) {
                                            return "<div><img src='../../assets/images/"+item.profilepic+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.processedSpId+" </div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
                                },
                                { title: "SP Name", name: "processedSpName", type: "text", css: "width14em" },
                                //     { title: "Project Name", name: "projectName", type: "text", css: "text-align-center" },
                                //     { title: "Profile Pic", name: "profilePic", type: "text", css: "text-align-center" },
                                { title: "Total Unique Beneficiaries", name: "processedTotalBeneficiaries", type: "text", css: "text-align-center" },
                                { title: "Revenue By Incentives", name: "processedRevenueIncentives", type: "text", css: "text-align-center back-red" },
                                {
                                        title: "Payment Status", itemTemplate: function (value: any, item: any) {
                                            return "<div class='text-align-center back-container padding-10-0'>"+item.paymentStatus+"</div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive"
                                },                                
                                { title: "Action", itemTemplate: function (value: any, item: any) {
                                           return "<div class='text-align-center'><button class='border-none' title='Re-Process Payment' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-spinner' title='Re-Process Payment'></i></button></div>";
                                              }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive text-align-center"
                                }

                        ]
                });
        }
        getDummyData() {
                return [
                        {
                                "id": "SP-2",
                                "spName": "Anuradha Singh",
                                "profilepic": "sp2.jpg",
                                "projectName": "Krisarthak",
                                "uniqueBeneficiaries": "3",
                                "nonIBeneficiaries": "30",
                                "iBeneficiaries": "30",
                                "totalServices": "60",
                                "revenueByServcies": "8.700.00",
                                "revenueByIncentives": "8,000.00",
                                "totalRevenue": "9,500.00"
                        },
                        {
                                "id": "SP-3",
                                "spName": "Amar Sirivastava",
                                "profilepic": "sp3.jpg",
                                "projectName": "Krisarthak",
                                "uniqueBeneficiaries": "3",
                                "nonIBeneficiaries": "30",
                                "iBeneficiaries": "40",
                                "totalServices": "70",
                                "revenueByServcies": "8.700.00",
                                "revenueByIncentives": "8,000.00",
                                "totalRevenue": "9,500.00"
                        },
                        {
                                "id": "SP-1",
                                "spName": "Suman Kumari",
                                "profilepic": "sp1.jpg",
                                "projectName": "Krisarthak",
                                "uniqueBeneficiaries": "3",
                                "nonIBeneficiaries": "10",
                                "iBeneficiaries": "5",
                                "totalServices": "15",
                                "revenueByServcies": "1160.00",
                                "revenueByIncentives": "52.00",
                                "totalRevenue": "1212.00"
                        }

                ];
        }
        getDummyData2() {
                return [
                        {
                                "processedSpId": "SP-1",
                                "processedSpName": "Suman Kumari",
                                "profilepic": "sp1.jpg",
                                "processedTotalBeneficiaries": "3",
                                "processedRevenueIncentives": "52.00",
                                "paymentStatus": "Unpaid"

                        },
                        {
                                "processedSpId": "SP-2",
                                "processedSpName": "Anuradha Singh",
                                "profilepic": "sp2.jpg",
                                "processedTotalBeneficiaries": "3",
                                "processedRevenueIncentives": "8,000.00",
                                "paymentStatus": "Unpaid"
                        },
                        {
                                "processedSpId": "SP-3",
                                "processedSpName": "Amar Srivastava",
                                "profilepic": "sp3.jpg",
                                "processedTotalBeneficiaries": "3",
                                "processedRevenueIncentives": "8,000.00",
                                "paymentStatus": "Unpaid"
                        }

                ];
        }
        ngOnInit(): void {
        }
        uniqueBeneficiaries() {

                return false;
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
