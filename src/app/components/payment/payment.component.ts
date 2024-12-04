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
                                { title: "Total Unique Beneficiaries", name: "uniqueBeneficiaries", type: "text", css: "text-align-center" },
                                { title: "Non-Incentivized Services (A)", name: "nonIBeneficiaries", type: "text", css: "text-align-center width14em" },
                                { title: "Incentivized Services (B)", name: "iBeneficiaries", type: "text", css: "text-align-center width14em" },
                                { title: "Total No of  Services (A+B)", name: "totalServices", type: "text", css: "text-align-center width14em" },
                                { title: "Revenue By Services (C)", name: "revenueByServcies", type: "text", css: "text-align-center width14em" },
                                { title: "Revenue By Incentives (D)", name: "revenueByIncentives", type: "text", css: "text-align-center width14em" },
                                { title: "Total Revenue (C+D)", name: "totalRevenue", type: "text", css: "text-align-center width14em" },
                                { title: "Action", name: "action", type: "text", css: "text-align-center width14em" },
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
                                {
                                        title: "SP ID", itemTemplate: function (value: any, item: any) {
                                            return "<div><img src='../../assets/images/"+item.profilepic+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.processedSpId+" </div>";
                                        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
                                },
                                { title: "SP Name", name: "processedSpName", type: "text", css: "width14em" },
                                //     { title: "Project Name", name: "projectName", type: "text", css: "text-align-center" },
                                //     { title: "Profile Pic", name: "profilePic", type: "text", css: "text-align-center" },
                                { title: "Total Unique Beneficiaries", name: "processedTotalBeneficiaries", type: "text", css: "text-align-center" },
                                { title: "Revenue By Incentives", name: "processedRevenueIncentives", type: "text", css: "text-align-center width14em" },
                                { title: "Payment Status", name: "paymentStatus", type: "text", css: "text-align-center width14em" },
                                { title: "Action", name: "action", type: "text", css: "text-align-center width14em" },
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
                                "uniqueBeneficiaries": "4",
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
                                "uniqueBeneficiaries": "4",
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
                                "uniqueBeneficiaries": "4",
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
                                "processedTotalBeneficiaries": "4",
                                "processedRevenueIncentives": "52.00",
                                "paymentStatus": "Unpaid"

                        },
                        {
                                "processedSpId": "SP-2",
                                "processedSpName": "Anuradha Singh",
                                "profilepic": "sp2.jpg",
                                "processedTotalBeneficiaries": "4",
                                "processedRevenueIncentives": "8,000.00",
                                "paymentStatus": "Paid"
                        },
                        {
                                "processedSpId": "SP-3",
                                "processedSpName": "Amar Srivastava",
                                "profilepic": "sp3.jpg",
                                "processedTotalBeneficiaries": "4",
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
