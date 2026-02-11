import { AfterViewInit, Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Event as RouterEvent } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table'; // Import PrimeNG Table reference
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-lbcba',
  templateUrl: './lbcba.component.html',
  styleUrls: ['./lbcba.component.css']
})
export class LbcbaComponent implements OnInit {
  cols: any[] = []; // Table columns
  isFilterOpen: boolean = false;
  displayColumn: string = 'none';
  displayFilter: string = 'none';
  activeFilter: string = 'filter-link';
  activeColumn: string = 'column-link';
  activeDefault: string = 'default-link';
  isColumnOpen: boolean = false;
  filteredData: any[] = [];
  filters: { [key: string]: string } = {};
  data: any[] = [];
  reportData: any[] = [];
  loading = false;

  constructor(private apiService: ApiService,
    private menuService: MenuService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // Wait until DOM and child views are fully rendered
    setTimeout(() => {
      this.updatePath();
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
          { label: 'View All Products', path: '/businessproduct' },
          { label: 'LBC Reports', path: '/lbcreports' }
        ]
      },
      {
        title: 'Reports Section',
        links: [
          { label: 'LBC Reports', path: '/lbcreport' },
          { label: 'LBC Business Analysis', path: '/lbcba' },
          { label: 'LBC Trend Analysis', path: '/lbctrend' }
        ]
      }
    ]);
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
}
