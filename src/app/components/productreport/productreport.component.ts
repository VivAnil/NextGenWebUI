import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { Table } from 'primeng/table'; // Import PrimeNG Table reference
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { MenuService } from 'src/app/services/menu.service';
declare var $: any; // Import jQuery

@Component({
  selector: 'app-productreport',
  templateUrl: './productreport.component.html',
  styleUrls: ['./productreport.component.css']
})
export class ProductreportComponent implements OnInit {
  filteredData: any[] = []; // Data to display in the grid
  @ViewChild('dt') dt: Table | undefined; // Access the table reference
  data: any[] = [];
  cols: any[] = []; // Table columns
  isFilterOpen: boolean = false;
  displayColumn: string = 'none';
  displayFilter: string = 'none';
  activeFilter: string = 'filter-link';
  activeColumn: string = 'column-link';
  activeDefault: string = 'default-link';
  isColumnOpen: boolean = false;
  filters: { [key: string]: string } = {}; // Stores filter values
  showFilterModal = false; // Controls filter modal visibility
  filteredCols: string[] = ["profilePicture", "dob", "fathersName", "middleName", "address", "panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId", "projectName", "pan", "pinCode", "aadhar", "soochnapreneurId", "bankName",
    "ifsc", "totalBeneficiaries", "totalRevenue", "totalRevenueByIncentives", "totalRevenueByServices", "totalServices", "dateOfRegistration", "economicStatusId", "educationId",
    "email", "soochnapreneur", "totalServices", "casteId", "services", "economicStatus", "gramPanchayat", "caste", "accountName"
  ];

  //FOR Report
  reportData: any[] = [];
  loading = false;


  constructor(private apiService: ApiService,
    private menuService: MenuService) { }

  ngOnInit(): void {
    //this.initJsGrid();
    this.loadReport();
  }
  ngAfterViewInit(): void {
    // Wait until DOM and child views are fully rendered
    setTimeout(() => {
      this.updatePath();
    });
  }

  updatePath(): void {
    console.log('updatepath');
    this.menuService.resetMenu();
    this.menuService.updateMenuItems([
      {
        title: 'User Details',
        links: [
        ]
      },
      {
        title: 'Company Details',
        links: [
        ]
      },
      {
        title: 'Service Section',
        links: [
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
        ]
      },
      {
        title: 'Reports Section',
        links: [
          { label: 'LBC Reports', path: '/lbcreport' },
          { label: 'Product Reports', path: '/productreport' },
          { label: 'LBC Business Analysis', path: '/lbcba' },
          { label: 'LBC Trend Analysis', path: '/lbctrend' }
        ]
      }
    ]);
  }
  loadReport() {
    this.loading = true;
    const fromdt = document.getElementById('lbcFromDate') as HTMLInputElement | null;

    const toDt = document.getElementById('lbcToDate') as HTMLInputElement | null;
    const fromDate = fromdt?.value;
    const toDate = toDt?.value;

    this.apiService
      .getProductReport(fromDate, toDate, 0)
      .subscribe({
        next: (res) => {
          this.reportData = res.map((item, index) => ({
            slNo: index + 1,
            ...item
          }));
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading LBC report', err);
          this.loading = false;
        }
      });
  }
  onGlobalFilter(query: string): void {
    const q = (query ?? '').toLowerCase();
    this.filteredData = this.data.filter(x =>
      JSON.stringify(x).toLowerCase().includes(q)
    );
  }
  exportToExcel() {
    // Convert data to worksheet
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredData);

    // Create a new workbook and append the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'GridData');

    // Generate an Excel file and trigger download
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'GridData');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });
    saveAs(data, fileName + '_export_' + new Date().getTime() + '.xlsx');
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
  toggleColumn(column: any) {
    column.visible = !column.visible; // Update visibility
  }
  columnVisibilityChange() {
    // This method is triggered whenever a checkbox is checked/unchecked
    console.log('Columns updated:', this.cols);
  }
  searchable(key: string): any {

    if (this.filteredCols.includes(key)) {
      return false;
    }
    else if (key == 'profilePicture') {
      return false;
    }
    else
      return true;
  }

  applyFilter() {
    // console.log('Apply Filter');
    // Always start with the original data
    this.filteredData = [...this.data];

    // Apply filters
    for (const key in this.filters) {
      if (this.filters[key]) {
        this.filteredData = this.filteredData.filter((item) =>
          item[key]
            ?.toString()
            .toLowerCase()
            .includes(this.filters[key].toLowerCase())
        );
      }
    }
    // If no filters are applied, show the full data
    if (Object.values(this.filters).every((value) => value === '')) {
      this.filteredData = [...this.data];
    }
    this.openFilter();
  }
  // Reset filters
  resetFilters() {
    this.filters = {}; // Clear filter values
    this.filteredData = [...this.data]; // Reset to full data
  }
  openDefault() {

    if (this.activeDefault == 'default-link') {

      this.activeDefault = 'default-link default-tab-btn';

    }
    else {

      this.activeDefault = 'default-link';
    }


  }
  initJsGrid() {
    $("#MappedGrid").jsGrid({
      width: "100%",
      autoload: true,
      paging: false,

      fields: [
        { name: "sn", title: "S.N.", width: 50 },
        { name: "pashuSakhi", title: "Pashu Sahki", width: 120 },
        { name: "village", title: "Village", width: 100 },
        { name: "block", title: "Block", width: 100 },
        { name: "district", title: "District", width: 100 },

        // Dana Mishran
        { name: "dm_unit", title: "Unit Sold", width: 80 },
        { name: "dm_revenue", title: "Revenue", width: 80 },
        { name: "dm_profit", title: "Net Profit", width: 80 },

        // Neem Oil
        { name: "no_unit", title: "Unit Sold", width: 80 },
        { name: "no_revenue", title: "Revenue", width: 80 },
        { name: "no_profit", title: "Net Profit", width: 80 },


        // Pachmola
        { name: "pm_unit", title: "Unit Sold", width: 80 },
        { name: "pm_revenue", title: "Revenue", width: 80 },
        { name: "pm_profit", title: "Net Profit", width: 80 },


        // Masal Bolus
        { name: "mb_unit", title: "Unit Sold", width: 80 },
        { name: "mb_revenue", title: "Revenue", width: 80 },
        { name: "mb_profit", title: "Net Profit", width: 80 },


        // Milk Replacer
        { name: "mr_unit", title: "Unit Sold", width: 80 },
        { name: "mr_revenue", title: "Revenue", width: 80 },
        { name: "mr_profit", title: "Net Profit", width: 80 },


        // Liver Tonic
        { name: "lt_unit", title: "Unit Sold", width: 80 },
        { name: "lt_revenue", title: "Revenue", width: 80 },
        { name: "lt_profit", title: "Net Profit", width: 80 },


        // Deworming
        { name: "dw_unit", title: "No of Goats", width: 80 },
        { name: "dw_revenue", title: "Revenue", width: 80 },
        { name: "dw_profit", title: "Net Profit", width: 80 },


        // Vaccination
        { name: "vc_unit", title: "No of Goats", width: 80 },
        { name: "vc_revenue", title: "Revenue", width: 80 },
        { name: "vc_profit", title: "Net Profit", width: 80 },


        // Castration
        { name: "cs_unit", title: "No of Goats", width: 80 },
        { name: "cs_revenue", title: "Revenue", width: 80 },
        { name: "cs_profit", title: "Net Profit", width: 80 },


        // Treatment
        { name: "tm_unit", title: "No of Goats", width: 80 },
        { name: "tm_revenue", title: "Revenue", width: 80 },
        { name: "tm_profit", title: "Net Profit", width: 80 },


        { name: "b_turnover", title: "Overall", width: 80 },
        { name: "s_turnover", title: "Services", width: 80 },
        { name: "i_turnover", title: "Input Sale", width: 80 },
        { name: "o_turnover", title: "Output Sale", width: 80 },
        { name: "m_overall", title: "Margin / Income", width: 80 }
      ],

      data: this.getData(),

      onRefreshed: function () {
        buildMultiLevelHeader();
        syncHeaderWidths();
      }
    });
  }
  getData() {
    return [
      {
        sn: 1,
        pashuSakhi: "Sita Devi",
        village: "Rampur",
        block: "Bajna",
        district: "Mathura",

        dm_unit: 120,
        dm_revenue: 36000,
        dm_profit: 4500,

        no_unit: 45,
        no_revenue: 13500,
        no_profit: 2200,

        pm_unit: 60,
        pm_revenue: 18000,
        pm_profit: 3000,

        mb_unit: 60,
        mb_revenue: 18000,
        mb_profit: 3000,

        mr_unit: 60,
        mr_revenue: 18000,
        mr_profit: 3000,

        lt_unit: 60,
        lt_revenue: 18000,
        lt_profit: 3000,

        dw_unit: 60,
        dw_revenue: 18000,
        dw_profit: 3000,

        vc_unit: 60,
        vc_revenue: 18000,
        vc_profit: 3000,

        cs_unit: 60,
        cs_revenue: 18000,
        cs_profit: 3000,

        tm_unit: 60,
        tm_revenue: 18000,
        tm_profit: 3000,

        b_turnover: 2000,
        s_turnover: 1000,
        i_turnover: 500,
        o_turnover: 500,
        m_overall: 300
      },
      {
        sn: 2,
        pashuSakhi: "Geeta Yadav",
        village: "Kheriya",
        block: "Goverdhan",
        district: "Mathura",

        dm_unit: 95,
        dm_revenue: 28500,
        dm_profit: 3800,

        no_unit: 30,
        no_revenue: 9000,
        no_profit: 1500,

        pm_unit: 60,
        pm_revenue: 18000,
        pm_profit: 3000,

        mb_unit: 60,
        mb_revenue: 18000,
        mb_profit: 3000,

        mr_unit: 60,
        mr_revenue: 18000,
        mr_profit: 3000,

        lt_unit: 60,
        lt_revenue: 18000,
        lt_profit: 3000,

        dw_unit: 60,
        dw_revenue: 18000,
        dw_profit: 3000,

        vc_unit: 60,
        vc_revenue: 18000,
        vc_profit: 3000,

        cs_unit: 60,
        cs_revenue: 18000,
        cs_profit: 3000,

        tm_unit: 60,
        tm_revenue: 18000,
        tm_profit: 3000,

        b_turnover: 2000,
        s_turnover: 1000,
        i_turnover: 500,
        o_turnover: 500,
        m_overall: 300
      },
      {
        sn: 3,
        pashuSakhi: "Radha Kumari",
        village: "Sonkh",
        block: "Farah",
        district: "Mathura",

        dm_unit: 150,
        dm_revenue: 45000,
        dm_profit: 6200,

        no_unit: 60,
        no_revenue: 18000,
        no_profit: 3000,

        pm_unit: 60,
        pm_revenue: 18000,
        pm_profit: 3000,

        mb_unit: 60,
        mb_revenue: 18000,
        mb_profit: 3000,

        mr_unit: 60,
        mr_revenue: 18000,
        mr_profit: 3000,

        lt_unit: 60,
        lt_revenue: 18000,
        lt_profit: 3000,

        dw_unit: 60,
        dw_revenue: 18000,
        dw_profit: 3000,

        vc_unit: 60,
        vc_revenue: 18000,
        vc_profit: 3000,

        cs_unit: 60,
        cs_revenue: 18000,
        cs_profit: 3000,

        tm_unit: 60,
        tm_revenue: 18000,
        tm_profit: 3000,

        b_turnover: 2000,
        s_turnover: 1000,
        i_turnover: 500,
        o_turnover: 500,
        m_overall: 300
      }
    ];
  }


}

function syncHeaderWidths() {
  const $grid = $("#MappedGrid");

  const $headerThs = $grid.find(".jsgrid-grid-header table thead tr:last-child th");
  const $bodyTds = $grid.find(".jsgrid-grid-body table tbody tr:first-child td");

  if (!$bodyTds.length) return;


}
function buildMultiLevelHeader() {
  const headerTable = $("#MappedGrid .jsgrid-grid-header table");

  // Remove old custom headers
  headerTable.find(".group-header").remove();

  // Row 1 → Top Level
  const row1 = `
        <tr class="group-header">
            <th rowspan="3">S.N.</th>
            <th rowspan="3">Pashu Sahki</th>
            <th rowspan="3">Village</th>
            <th rowspan="3">Block</th>
            <th rowspan="3">District</th>
            <th colspan="18">INPUT SALES</th>
			<th colspan="12">SERVICES</th>
			
			<th rowspan="3">Business Turnover</th>
            <th rowspan="3">Turnover from </th>
            <th rowspan="3">Turnover from </th>
            <th rowspan="3">Turnover from </th>
			<th rowspan="3">Overall</th>
			
        </tr>`;

  // Row 2 → Product Level
  const row2 = `
        <tr class="group-header">
            <th colspan="3">Dana Mishran</th>
            <th colspan="3">Neem Oil</th>
			<th colspan="3">Pachmola</th>
			<th colspan="3">Masala Bolus</th>
			<th colspan="3">Milk Replacer</th>
			<th colspan="3">Liver Tonic</th>
			
			<th colspan="3">Deworming</th>
			<th colspan="3">Vaccination</th>
			<th colspan="3">Castration</th>
			<th colspan="3">Treatment</th>
        </tr>`;

  // Row 3 → Column Level
  const row3 = `
        <tr class="group-header">
            <th>Unit Sold</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
            <th>Unit Sold</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>Unit Sold</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>Unit Sold</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>Unit Sold</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>Unit Sold</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>No. of Goats</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>No. of Goats</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>No. of Goats</th>
            <th>Revenue</th>
            <th>Net Profit</th>
			
			<th>No. of Goats</th>
            <th>Revenue</th>
            <th>Net Profit</th>
        </tr>`;

  headerTable.prepend(row3).prepend(row2).prepend(row1);
}
