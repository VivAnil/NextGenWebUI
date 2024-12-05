import { Component, OnInit } from '@angular/core';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-paymentreport',
  templateUrl: './paymentreport.component.html',
  styleUrls: ['./paymentreport.component.css']
})
export class PaymentreportComponent implements OnInit {

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
                                {
                                        title: "SP ID", itemTemplate: function (value: any, item: any) {
                                            return "<div><img src='../../assets/images/"+item.profilepic+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.id+" </div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
                                },
                                { title: "SP Name", name: "spName", type: "text", css: "width14em" },
                                //     { title: "Project Name", name: "projectName", type: "text", css: "text-align-center" },
                                //     { title: "Profile Pic", name: "profilePic", type: "text", css: "text-align-center" },
                                { title: "Mobile No.", name: "mobile", type: "text", css: "text-align-center" },
                                { title: "EMail", name: "email", type: "text", css: "text-align-center width14em" },
                                { title: "Projects", name: "projects", type: "text", css: "text-align-center width14em" },
                                { title: "State", name: "state", type: "text", css: "text-align-center width14em" },
                                { title: "District", name: "district", type: "text", css: "text-align-center width14em" },
                                { title: "Block", name: "block", type: "text", css: "text-align-center width14em" },
                                { title: "Gram Panchayat", name: "gp", type: "text", css: "text-align-center width14em" },
                                { title: "Village", name: "village", type: "text", css: "text-align-center width14em" },
                                { title: "Pin Code", name: "pin", type: "text", css: "text-align-center width14em" },
                                { title: "Address", name: "address", type: "text", css: "text-align-center width14em" },

                                { title: "Account Name", name: "accountName", type: "text", css: "text-align-center width14em" },
                                { title: "Account No.", name: "accountNo", type: "text", css: "text-align-center width14em" },
                                { title: "Bank", name: "bank", type: "text", css: "text-align-center width14em" },
                                { title: "IFSC Code", name: "ifsc", type: "text", css: "text-align-center width14em" },
                                { title: "PAN", name: "pan", type: "text", css: "text-align-center width14em" },

                                { title: "Total Unique Beneficiaries", name: "totalUniqueBen", type: "text", css: "text-align-center width14em" },
                                { title: "PAN Card", name: "totalPan", type: "text", css: "text-align-center back-digital" },
                                { title: "Aadhar", name: "totalAadhar", type: "text", css: "text-align-center  back-digital" },
                                { title: "Digital Services Total", name: "totalds", type: "text", css: "text-align-center  back-digital" },
                                { title: "Bank Loan Code", name: "bankLoan", type: "text", css: "text-align-center back-financial" },
                                { title: "Cash Withdrawl", name: "cash", type: "text", css: "text-align-center back-financial" },
                                { title: "Financial Services Total", name: "totalfs", type: "text", css: "text-align-center back-financial" },

                                { title: "Ration Card", name: "ration", type: "text", css: "text-align-center back-government" },
                                { title: "Pension", name: "pension", type: "text", css: "text-align-center back-government" },
                                { title: "Government Compliances Total", name: "totalGovt", type: "text", css: "text-align-center back-government" },
                                { title: "Revenue By Services", name: "revenueServices", type: "text", css: "text-align-center " },
                                { title: "Revenue By Incentives", name: "revenueIncentives", type: "text", css: "text-align-center back-red" },
                                { title: "Total Services Worth", name: "totalServices", type: "text", css: "text-align-center " },

                        ]
                });

               
        }
        getDummyData() {
                return [
                  {
                    "id": "SP-1",
                    "spName": "Anuradha Singh",
                    "profilepic": "sp1.jpg",
                    "mobile": "9809809800",
                    "email": "abc@defindia.org",
                    "projects": "",
                    "state": "Jharkhand",
                    "district": "Ranchi",
                    "block": "Block",
                    "gp": "Gram Panchayat",
                    "village": "Village",
                    "pin": "800120",
                    "address": "address",
                    "accountName": "Anuradha Singh",
                    "accountNo": "HDF0101",
                    "bank": "HDFC Bank",
                    "ifsc": "HDFC001010",
                    "pan": "pan",
                    "totalUniqueBen": "4",
                    "totalPan": "30",
                    "totalAadhar": "20",
                    "totalds": "50",
                    "bankLoan": "10",
                    "cash": "100",
                    "totalfs": "120",
                    "ration": "20",
                    "pension": "10",
                    "totalGovt": "30",
                    "revenueServices":"12,400.00",
                    "revenueIncentives": "4,600.00",
                    "totalServices": "26,000"	
                  },
                  {
                    "id": "SP-2",
                    "spName": "Suman Kumari",
                    "profilepic": "sp2.jpg",
                    "mobile": "8080999800",
                    "email": "sk@gmail.com",
                    "projects": "",
                    "state": "Bihar",
                    "district": "Patna",
                    "block": "Block",
                    "gp": "Gram Panchayat",
                    "village": "Village",
                    "pin": "800210",
                    "address": "address",
                    "accountName": "Suman Kumari",
                    "accountNo": "SBI002102",
                    "bank": "SBI",
                    "ifsc": "SBI981010",
                    "pan": "PAN",
                    "totalUniqueBen": "4",
                    "totalPan": "40",
                    "totalAadhar": "10",
                    "totalds": "50",
                    "bankLoan": "80",
                    "cash": "100",
                    "totalfs": "180",
                    "ration": "20",
                    "pension": "100",
                    "totalGovt": "130",
                    "revenueServices":"10,000.00",
                    "revenueIncentives": "5,500.00",
                    "totalServices": "22,000"	
                  },
                  {
                    "id": "SP-3",
                    "spName": "Amar Srivastava",
                    "profilepic": "sp3.jpg",
                    "mobile": "9880999800",
                    "email": "	Amar Srivastava@gmail.com",
                    "projects": "",
                    "state": "",
                    "district": "",
                    "block": "",
                    "gp": "",
                    "village": "",
                    "pin": "",
                    "address": "",
                    "accountName": "Amar Srivastava",
                    "accountNo": "SBI002102",
                    "bank": "SBI",
                    "ifsc": "SBI1009",
                    "pan": "PAN",
                    "totalUniqueBen": "4",
                    "totalPan": "40",
                    "totalAadhar": "10",
                    "totalds": "50",
                    "bankLoan": "80",
                    "cash": "100",
                    "totalfs": "180",
                    "ration": "20",
                    "pension": "100",
                    "totalGovt": "130",
                    "revenueServices":"10,000.00",
                    "revenueIncentives": "5,500.00",
                    "totalServices": "22,000"	
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
