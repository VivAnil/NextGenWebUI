import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table'; // Import PrimeNG Table reference
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SexOption } from '../../models/master.model';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { BusinessProduct, BusinessSubCategory, BusinessType, DropdownOption, RWEBusinessFilters, RweBusiness, RweBusinessProduct, RweBusinessSubCatType, RweBusinessType, ServiceOrProduct, rweBusiness } from '../../services/rweBusiness.service';
import { tgtBusiness } from 'src/app/models/rwe-business.model';
// import { UserProfile } from 'src/app/models/IUserProfile';
declare let $: any; // Import jQuery
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  @ViewChild('dtLbc') dtLbc: Table | undefined;
  expandedRow: any | null = null;
  displayAssignProject = 'none';
  loadingLbc = false;
  successMessage = '';
  errorMessage = '';
  userdetailsApiUrl: string = environment.userdetailsApiUrl;
  private isVisible: boolean = false;
  @ViewChild('dt') dt: Table | undefined; // Access the table reference
  data: any[] = [];
  cols: any[] = []; // Table columns
  filteredData: any[] = []; // Data to display in the grid
  lbcFilteredData: any[] = []; // Data to display in the grid
  dataKey: string = ''; // Identifies which data to fetch
  globalFilterFields: string[] = []; // Fields for global search
  pageHead: string = 'Project Officer Master';
  companyId!: number;
  roleId!: number;
  companyRoleId!: number;
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
  filters: { [key: string]: string } = {}; // Stores filter values
  lbcFilters: { [key: string]: string } = {}; // Stores filter values
  rweFilters: { [key: string]: string } = {}; // Stores filter values
  showFilterModal = false; // Controls filter modal visibility
  addUser: string = 'dv_addSProjectOfficer';
  private genders: SexOption[] = [];
  serPillarData: any[] = [];
  selectedOption: any; // Holds the selected value
  loading: boolean = true; // Set initial loading state
  showColumnModal = false; // Modal visibility control
  filteredCols: string[] = ["srNo", "profilePicture", "fathersName", "middleName", "address", "panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId", "projectName", "pan", "pinCode", "aadhar", "soochnapreneurId", "bankName",
    "ifsc", "totalBeneficiaries", "totalRevenue", "totalRevenueByIncentives", "totalRevenueByServices", "totalServices", "dateOfRegistration", "economicStatusId", "educationId",
    "email", "soochnapreneur", "totalServices", "casteId", "services", "economicStatus", "gramPanchayat"
  ];
  filteredLbcCols: string[] = ["srNo", "profilePicture", "fathersName", "middleName", "address", "panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId", "projectName", "pan", "pinCode", "aadhar", "soochnapreneurId", "bankName",
    "ifsc", "totalBeneficiaries", "totalRevenue", "totalRevenueByIncentives", "totalRevenueByServices", "totalServices", "dateOfRegistration", "economicStatusId", "educationId",
    "email", "soochnapreneur", "totalServices", "casteId", "services", "economicStatus", "gramPanchayat"
  ];
  filteredRweCols: string[] = ["srNo", "dob", "profilePicture", "fathersName", "middleName", "address", "panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId", "projectName", "pan", "pinCode", "aadhar", "soochnapreneurId", "bankName",
    "ifsc", "totalBeneficiaries", "totalRevenue", "totalRevenueByIncentives", "totalRevenueByServices", "totalServices", "dateOfRegistration", "economicStatusId", "educationId",
    "email", "soochnapreneur", "totalServices", "casteId", "services", "economicStatus", "gramPanchayat"
  ];
  sexOptions: { id: number; name: string }[] = [];
  formData = {
    Id: '',
    ProfilePicture: '',
    FirstName: '',
    MiddleName: '',
    LastName: '',
    DOB: '',
    Sex: '',
    Mobile: '',
    Email: '',
    ProjectName: '',
    StateId: '',
    DistrictId: '',
    BlockId: '',
    Village: '',
    GramPanchayat: '',
    PinCode: '',
    Address: '',
    AccountHolderName: '',
    AccountNo: '',
    BankName: '',
    IFSCCode: '',
    BankBranch: '',
    CancelledCheque: '',
    PAN: '',
    PANImage: '',
    Aadhar: '',
    AadharImage: ''
  };
  filterLbc(event: Event, dt: Table, field: string) {
    const value = (event.target as HTMLInputElement).value;
    dt.filter(value, field, 'contains');
  }
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  currentUserType = '';
  selectedState: number = 0;
  selectedDistrict: number = 0;
  selectedBlock: number | null = null;

  allServiceOrProducts: BusinessProduct[] = [];
  BusinessSubCatType: DropdownOption[] = [];
  ServiceOrProductOptions: DropdownOption[] = [];
  isBusinessDropdownEnabled = false;

  ServiceOrProduct: { id: number; name: string }[] = [];
  sellingPrice: number | null = null;
  unit: string | null = null;
  margin: number | null = null;

  // selections
  selectedBusinessType: number | null = null;
  selectedBusinessSubCatType: number | null = null;
  selectedServiceOrProduct: number | null = null;
  years: any[] = [];

  rwes: any[] = [];
  filteredRwes: any[] = [];  // filtered list

  rweBusinesses: RweBusiness[] = [];
  rweBusinessfilters: RWEBusinessFilters | undefined;
  //rweBusinessType: RweBusinessType[] | undefined;
  rweBusinessType: BusinessType[] = [];
  // BusinessSubCatType: BusinessSubCategory[] = [];
  // selectedBusinessSubCatType: number | null = null;

  rweBusinessSubCatType: RweBusinessSubCatType[] | undefined;
  rweServiceOrProduct: RweBusinessProduct[] | undefined;
  selectedRwe: any = "";
  newBusinessName: string = '';
  selectedBusinessId: number | '' = '';
  isAddingNewBusiness: boolean = false;

  selectedRWEBusinessType: any = "";
  selectedRWEBusinessSubCatType: any = "";
  selectedRWEServiceOrProduct: any = "";
  selectedStartMonth: number = 0;
  selectedStartYear: number = 2026;
  selectedInventoryUnit: any = "Other";
  selectedInventory: number = 0;
  totalInvestment: number = 0;
  selfInvestment: number = 0;
  projectLoan: number = 0;
  bankLoan: number = 0;
  collectiveLoan: number = 0;
  hideSaveRWE: boolean = false;
  tgtBusinesses: { id: number; businessName: string }[] = [];
  allTgtBusinesses: tgtBusiness[] = [];
  selectedBusId: number | null = null;
  constructor(private route: ActivatedRoute, private serviceApi: ApiService, private http: HttpClient, private menuService: MenuService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    this.companyId = userRoleSettings.companyId;
    this.formData.DOB = '1990-12-25';
    this.roleId = userRoleSettings.systemRoleId;
    this.companyRoleId = userRoleSettings.companyRoleId;
    this.route.params.subscribe((params) => {
      this.companyId = +params['companyid'];
      this.roleId = +params['roleid'];
      console.log('companyId = ' + this.companyId + ' and Role id ' + this.roleId);
    });
    if (this.companyId != undefined && this.companyId != 32) {
      this.displayAssignProject = 'block';
    }
    this.cols = [

      // {
      //   header: "Profile", field: function (value: any, item: any) {
      //       return "<div><img src='"+item.profilePicture+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.id+" </div>";
      //   }, type: "text"
      // },
      // { header: 'ID', field: 'profilePicture', type: "text", class: "text-align-center width8em word-break-all", search:true, showInGrid:true},//profilePictur
      // { header: '', field: 'id', type: "text", class: "text-align-center width8em word-break-all", search:false, showInGrid:true},//profilePicture

      { header: 'First Name', field: 'firstName', type: "text", css: "text-align-center width16em word-break-all", visible: true, search: true, showInGrid: true },
      { header: 'Last Name', field: 'lastName', type: "text", css: "text-align-center width14em word-break-all", visible: true, search: true, showInGrid: true },
      { header: 'DOB', field: 'dob', type: "text", css: "text-align-center width12em word-break-all", visible: true, search: false },
      { header: 'Sex', field: 'sex', type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      { header: "Mobile No.", field: "mobile", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      { header: "Email Id", field: "email", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      // { header: "Project Name", field: "projectName", type: "text", css: "text-align-center width14em word-break-all" ,visible: true, search:true },
      { header: "State", field: "stateName", type: "text", css: "text-align-center width10em", visible: true, search: true },
      { header: "District", field: "districtame", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      { header: "Block", field: "blockName", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      { header: "Village", field: "village", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      { header: "Pin Code", field: "pinCode", type: "text", css: "text-align-center width8em word-break-all", visible: true, search: true },
      { header: "PAN Card", field: "pan", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },
      { header: "Aadhar", field: "aadhar", type: "text", css: "text-align-center width10em word-break-all", visible: true, search: true },

    ];
    // Listen to the route to determine which dataset to load
    this.route.url.subscribe((url) => {
      if (url[2]?.path === '2') {
        this.dataKey = 'pc';
        this.pageHead = 'Programmer Manager';
      } else if (url[2]?.path === '4') {
        this.dataKey = 'dc';
        this.pageHead = 'Programme Manager';
      } else if (url[2]?.path === '5') {
        this.dataKey = 'bc';
        this.pageHead = 'CLM';
      } else if (url[2]?.path === '3') {
        this.dataKey = 'sp';
        this.pageHead = 'LBC';
      }

      console.log('Data key = ' + this.dataKey);
      // this.inituserDetailsGrid(); // Fetch data based on the dataKey
      this.loadData();
    });

    this.updatePath();

  }
  loadData(): void {
    this.serviceApi.fetchUserDetails(this.userdetailsApiUrl + this.companyId + '/' + this.roleId, this.dataKey).subscribe({
      next: (response) => {
        // this.data = response; // Populate the grid with fetched data
        this.data = response.map((item: any, index: number) => ({
          srNo: index + 1,
          ...item
        }));
        this.filteredData = [...this.data]; // Clone the full data initially
        // // Dynamically set columns based on API keys
        if (this.data.length > 0) {
          this.cols = Object.keys(this.data[0])
            //  Filter out unwanted columns
            .filter(key => !this.filteredCols.includes(key))
            // Map the rest to column definitions
            .map((key) => ({
              field: key,
              header: this.capitalizeFirstLetter(key),
              visible: this.checkVisible(key),
              width: '200px',
              search: this.searchable(key),
              showInGrid: this.checkVisible(key)
            }));
          //  this.cols = Object.keys(this.data[0]).map((key) => ({
          //     field: key,
          //     header: this.capitalizeFirstLetter(key),
          //     visible: this.checkVisible(key),
          //    width: '200px',
          //     search: this.searchable(key),
          //     showInGrid:this.checkVisible(key)
          //   }));

          // Set fields for global filtering
          this.globalFilterFields = Object.keys(this.filteredData[0]);
          this.globalFilterFields = this.cols;
          this.loading = false; // Turn off loading once data is fetched
          console.log(this.cols);
          // Initialize filters for each column
          this.cols.forEach((col) => {
            if (!this.filteredCols.includes(col.field))
              if (this.checkVisible(col.field))
                this.filters[col.field] = '';
          });

        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.data = []; // Set an empty array if there's an error
      }
    });
  }

  onClmClick(rowData: any, event: MouseEvent): void {
    event.stopPropagation();
    if (this.expandedRow === rowData) {
      this.expandedRow = null;
      return;
    }
    this.loadingLbc = true;
    // Set this row as expanded
    this.expandedRow = rowData;
    rowData.lbcList = []; // Reset old data

    console.log('In onClmClick. RoleId is ' + this.roleId);
    if (this.roleId == 5) {
      // Call API using CLM Id
      this.serviceApi.getLbcByClmId(rowData.id).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            //  Add serial number for each LBC row
            rowData.lbcList = res.map((item: any, index: number) => ({
              srNo: index + 1,
              ...item
            }));
            //  rowData.lbcList = res || [];
            const first = res[0];
            this.lbcFilteredData = [...rowData.lbcList];

            // rowData.lbcCols = Object.keys(first).map(key => ({
            //   field: key,
            //   header: this.formatHeader(key)
            // }));
            // rowData.lbcCols = Object.keys(first).map((key) => ({
            //   field: key,
            //   header: this.capitalizeFirstLetter(key),
            //   visible: this.checkVisible(key),
            //   width: '150px',
            //   // search: this.searchable(key),
            //   showInGrid: this.checkVisible(key)
            // }));

            rowData.lbcCols = Object.keys(this.data[0])
              //  Filter out unwanted columns
              .filter(key => !this.filteredCols.includes(key))
              // Map the rest to column definitions
              .map((key) => ({
                field: key,
                header: this.capitalizeFirstLetter(key),
                visible: this.checkVisible(key),
                width: '200px',
                search: this.searchable(key),
                showInGrid: this.checkVisible(key)
              }));

            // Set fields for global filtering
            this.globalFilterFields = Object.keys(this.lbcFilteredData[0]);
            this.globalFilterFields = this.cols;
            this.loading = false; // Turn off loading once data is fetched
            console.log(this.cols);
            // Initialize filters for each column
            this.cols.forEach((col) => {
              if (!this.filteredRweCols.includes(col.field))
                if (this.checkVisible(col.field))
                  this.lbcFilters[col.field] = '';
            });
            this.loadingLbc = false;
            this.cdr.detectChanges(); // Notify Angular to update view
          } else {
            rowData.lbcList = [];
            rowData.lbcCols = [];

          }
          this.loadingLbc = false;
        },
        error: (err) => {
          console.error("Failed to load LBC data", err);
          rowData.lbcList = [];
          this.loadingLbc = false;
          this.cdr.detectChanges();
        }
      });
    }
    else if (this.roleId == 3) {

      // Call API using CLM Id
      this.serviceApi.fetchBeneficiaries(this.userdetailsApiUrl + this.companyId + '/0/' + rowData.id, this.dataKey).subscribe({
        next: (res) => {
          if (res && res.length > 0) {
            //  Add serial number for each LBC row
            rowData.lbcList = res.map((item: any, index: number) => ({
              //srNo: index + 1,
              ...item
            }));
            //  rowData.lbcList = res || [];
            const first = res[0];
            this.lbcFilteredData = [...rowData.lbcList];

            // rowData.lbcCols = Object.keys(first).map(key => ({
            //   field: key,
            //   header: this.formatHeader(key)
            // }));
            // rowData.lbcCols = Object.keys(first).map((key) => ({
            //   field: key,
            //   header: this.capitalizeFirstLetter(key),
            //   visible: this.checkVisible(key),
            //   width: '150px',
            //   // search: this.searchable(key),
            //   showInGrid: this.checkVisible(key)
            // }));
            rowData.lbcCols = Object.keys(this.data[0])
              //  Filter out unwanted columns
              .filter(key => !this.filteredRweCols.includes(key))
              // Map the rest to column definitions
              .map((key) => ({
                field: key,
                header: this.capitalizeFirstLetter(key),
                visible: this.checkVisible(key),
                width: '200px',
                search: this.searchable(key),
                showInGrid: this.checkVisible(key)
              }));
            // Set fields for global filtering
            this.globalFilterFields = Object.keys(this.lbcFilteredData[0]);
            this.globalFilterFields = this.cols;
            this.loading = false; // Turn off loading once data is fetched
            console.log(this.cols);
            // Initialize filters for each column
            this.cols.forEach((col) => {
              if (!this.filteredRweCols.includes(col.field))
                if (this.checkVisible(col.field))
                  this.rweFilters[col.field] = '';
            });
            this.loadingLbc = false;
            this.cdr.detectChanges(); // Notify Angular to update view
          } else {
            rowData.lbcList = [];
            rowData.lbcCols = [];

          }
          this.loadingLbc = false;
        },
        error: (err) => {
          console.error("Failed to load LBC data", err);
          rowData.lbcList = [];
          this.loadingLbc = false;
          this.cdr.detectChanges();
        }
      });

    }
    this.loadingLbc = false;

  }

  // Utility - Format header
  private formatHeader(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  }



  ngAfterViewInit(): void {
    console.log('AfterViewInit');
    //this.inituserDetailsGrid();
  }

  inituserDetailsGrid() {
    $('#MappedGrid').jsGrid({
      width: "100%",
      padding: "1%",
      inserting: false,
      height: "auto",
      filtering: false,

      loadIndication: true,
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

      // data: this.getDummyData(),
      autoload: true,

      controller: {
        loadData: () => {
          return this.serviceApi.getuserDetails(this.userdetailsApiUrl + this.companyId + '/' + this.roleId).toPromise();
        },
      },
      fields: [
        {
          title: "ID", itemTemplate: function (value: any, item: any) {
            return "<div><img src='" + item.profilePicture + "' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > " + item.id + " </div>";
          }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em word-break-all"
        },
        //{ title: "Profile Pic", name: "profilePicture", type: "text", validate: "required", css: "width10em text-align-center" },
        //{ title: "ID", name: "id", type: "text", validate: "required", css: "width6em text-align-center" },
        { title: "First Name", name: "firstName", type: "text", validate: "required", css: "width10em text-align-center word-break-all" },
        { title: "Last Name", name: "lastName", type: "text", css: "width10em word-break-all" },
        { title: "DOB", name: "dob", type: "text", css: "width10em" },
        { title: "Sex", name: "sex", type: "text", css: "text-align-center width10em" },
        { title: "Mobile No.", name: "mobile", type: "text", css: "text-align-center width10em word-break-all" },
        { title: "Email Id", name: "email", type: "text", css: "text-align-center width10em word-break-all" },
        { title: "Project Name", name: "projectName", type: "text", css: "text-align-center width14em word-break-all" },
        { title: "State", name: "stateName", type: "text", css: "text-align-center width10em" },
        { title: "District", name: "districtame", type: "text", css: "text-align-center width10em word-break-all" },
        { title: "Block", name: "blockName", type: "text", css: "text-align-center width10em word-break-all" },
        { title: "Village", name: "village", type: "text", css: "text-align-center width10em word-break-all" },
        { title: "Pin Code", name: "pinCode", type: "text", css: "text-align-center width8em word-break-all" },
        { title: "PAN Card", name: "pan", type: "text", css: "text-align-center width10em word-break-all" },
        { title: "Aadhar", name: "aadhar", type: "text", css: "text-align-center width10em word-break-all" },

      ]

    });


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
  onSelectionChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('Selected Option ID:', selectedId);
    this.selectedOption = selectedId;

  }
  openDefault() {

    if (this.activeDefault == 'default-link') {

      this.activeDefault = 'default-link default-tab-btn';

    }
    else {

      this.activeDefault = 'default-link';
    }


  }

  assignProject() {

  }
  onGlobalFilter(event: Event) {

    const inputValue = (event.target as HTMLInputElement).value; // Cast to HTMLInputElement
    console.log('inputValue ' + inputValue);
    this.dt?.filterGlobal(inputValue, 'contains');
  }
  // Utility function to format headers
  capitalizeFirstLetter(str: string): string {
    // if (str=='profilePicture') 
    //   return '';
    // else
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
  }
  toggleColumn(column: any) {
    column.visible = !column.visible; // Update visibility
  }
  columnVisibilityChange() {
    // This method is triggered whenever a checkbox is checked/unchecked
    console.log('Columns updated:', this.cols);
  }
  checkVisible(key: string): any {
    console.log(key);
    if (this.filteredCols.includes(key)) {
      return false;
    }
    else
      return true;
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
    console.log('Apply Filter');
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

  // loadModal(modalId: string) {
  //   const modalButton = document.getElementById('btn_openModal');
  //   if (modalButton) {
  //     this.fetchMasterData();
  //     modalButton.setAttribute('data-bs-target', `#${modalId}`);
  //     modalButton.click(); // Programmatically trigger the button to open the modal
  //   }
  // }
  loadModal(dataKey: string) {
    this.currentUserType = dataKey; // 'sp', 'pc', 'clm', etc.

    this.fetchMasterData();

    const modalEl = document.getElementById('userModal');
    if (!modalEl) {
      console.error('Modal not found');
      return;
    }

    const existing = Modal.getInstance(modalEl);
    if (existing) {
      existing.dispose();
    }

    const modal = new Modal(modalEl, {
      backdrop: 'static',
      keyboard: false
    });

    modal.show();
  }


  // Form submission logic
  submitForm() {
    if (!this.formData.FirstName || !this.formData.LastName) {
      return; // Prevent submission if mandatory fields are empty
    }
    const apiUrl = environment.userdetailsApiUrl;
    console.log(apiUrl);
    // const payload = {
    //   ...this.formData
    // };
    this.formData.Id = '0';
    this.http.post(apiUrl, this.formData).subscribe({
      next: (response) => {
        this.successMessage = 'User Added';
        alert(this.successMessage)
      },
      error: (error) => {
        this.errorMessage = error;


        console.error('Error Add new officer', JSON.stringify(error));
      },
      complete: () => {
        console.log(' Request completed.');
      }
    });
    // Handle form submission logic (e.g., post to an API)
    console.log('Submitting form data:', this.formData);


  }
  readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
  fetchMasterData() {
    this.http.get<SexOption[]>('https://motherappmasterapi.azurewebsites.net/api/Gender/GetAllGender').subscribe(
      (response: SexOption[]) => {
        console.log('response = ' + response);
        this.sexOptions = response;
        console.log('SexOptions = ' + this.sexOptions);

        this.getStates();
      },
      (error: HttpErrorResponse) => {
        console.error('Failed to fetch sex options', error);
      }
    );
  }
  getStates() {
    this.http.get<any[]>('https://motherappmasterapi.azurewebsites.net/api/State/GetAllStates').subscribe(
      (response) => {
        this.states = response;
        if (this.states.length > 0) {
          this.selectedState = this.states[0].id; // Select first state by default
          console.log('this.selectedState = ' + this.selectedState);
          if (this.selectedState > 0)
            this.getDistricts(this.selectedState);
        }
      },
      (error) => {
        console.error('Error fetching states:', error.message);
      }
    );
  }
  // Fetch districts based on selected state
  getDistricts(stateId: number) {
    this.http.get<any[]>(`https://motherappmasterapi.azurewebsites.net/api/District/GetAllDistrictsByStateId?stateId=${stateId}`).subscribe(
      (response) => {
        this.districts = response;
        this.selectedDistrict = 0; // Reset district dropdown
        this.blocks = []; // Reset block dropdown
        this.selectedDistrict = this.districts[0].id; // Select first state by default
        console.log('this.selectedDistrict = ' + this.selectedDistrict);
        if (this.districts.length > 0) {
          this.selectedDistrict = this.districts[0].id;
          if (this.selectedDistrict > 0)
            this.getBlocks(this.selectedDistrict);
        }
      },
      (error) => {
        console.error('Error fetching districts:', error.message);
      }
    );
  }

  // Fetch blocks based on selected district
  getBlocks(districtId: number) {
    this.http.get<any[]>(`https://motherappmasterapi.azurewebsites.net/api/Block/GetAllBlocksByDistrictId?districtId=${districtId}`).subscribe(
      (response) => {
        this.blocks = response;
        this.selectedBlock = null; // Reset block dropdown
        this.selectedBlock = this.blocks[0].id; // Select first state by default
        console.log('this.selectedBlock = ' + this.selectedBlock);
      },
      (error) => {
        console.error('Error fetching blocks:', error.message);
      }
    );
  }

  // On state selection change
  onStateChange(event: Event) {
    this.selectedState = Number((event.target as HTMLSelectElement).value);
    if (this.selectedState) {
      this.getDistricts(this.selectedState);
    }
  }

  // On district selection change
  onDistrictChange(event: Event) {
    this.selectedDistrict = Number((event.target as HTMLSelectElement).value);
    if (this.selectedDistrict) {
      this.getBlocks(this.selectedDistrict);
    }
  }
  onFileChange(event: Event, field: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.readFileAsBase64(file).then(base64 => {
        (this.formData as any)[field] = base64;
      });
    }
  }
  onDOBChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.formData.DOB = input.value; // Format will be yyyy-MM-dd
    console.log('DOB changed to:', this.formData.DOB);
  }

  updatePath(): void {
    console.log('updatepath');
    this.menuService.resetMenu();
    this.menuService.updateMenuItems([
      {
        title: 'User Configuration',
        links: [
        ]
      },
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
        title: 'Report Section',
        links: [
        ]
      },
      {
        title: 'Service Section',
        links: [
        ]
      },
      {
        title: 'Payment Section',
        links: [
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' }
        ]
      }
    ]);
  }

  loadDashboard() {
    //this.companyId
    this.router.navigate(['dashboard/' + this.roleId]);
  }

  toggleRow(rowData: any): void {
    if (this.expandedRow === rowData) {
      this.expandedRow = null; // collapse
    } else {
      this.expandedRow = rowData; // expand this row
    }
  }

  onLBCChange() {
    if (!this.selectedRwe) {
      this.rweBusinessType = [];
      this.selectedRWEBusinessType = null;

      this.tgtBusinesses = [];
      this.selectedBusId = null;
      return;
    }

    const companyId = 32;
    const companyRoleId = 37;
    const rweId = this.selectedRwe;
    this.serviceApi.getBusinessTypes(companyId, companyRoleId).subscribe({
      next: (data) => {
        this.rweBusinessType = data;
        this.selectedRWEBusinessType = null;
      },
      error: (err) => {
        console.error('Failed to load business types', err);
      }
    });

    this.serviceApi.getBusinessesByRweId(rweId).subscribe({
      next: (res) => {
        this.allTgtBusinesses = res;

        this.tgtBusinesses = res.map(b => ({
          id: b.rweBusinessId,
          businessName: b.businessName
        }));

        this.selectedBusId = null;
        this.isBusinessDropdownEnabled = this.rweBusinesses.length > 0;
        console.log('Businesses:', this.rweBusinesses);
      },
      error: (err) => console.error('Failed to load businesses', err)
    });

  }


  onBusinessChange(): void {


  }
  loadLbcList() {
    this.serviceApi.fetchUserDetails(this.userdetailsApiUrl + this.companyId + '/' + this.roleId, this.dataKey).subscribe({
      next: (data) => {
        this.filteredRwes = data;
      },
      error: (err) => {
        console.error('Error loading LBC users', err);
      }
    });
  }
  loadBusinessModal() {
    this.selectedRwe = null;
    this.loadLbcList();

    const modalEl = document.getElementById('addBusiness');
    if (!modalEl) {
      console.error('Business modal not found');
      return;
    }

    // Dispose old instance if exists
    const existing = Modal.getInstance(modalEl);
    if (existing) {
      existing.dispose();
    }

    const modal = new Modal(modalEl, {
      backdrop: 'static',
      keyboard: false
    });

    modal.show();
  }
  onSaveBusiness() {

  }
  onFilterChange(type: string, event: any) {
    if (type === 'selectedRWEBusinessType') {
      const businessTypeId = this.selectedRWEBusinessType;
      if (!businessTypeId) return;

      this.serviceApi
        .getServiceOrProductByBusinessType(businessTypeId)
        .subscribe({
          next: (res) => {
            this.allServiceOrProducts = res;

            // 🔥 THIS IS THE KEY PART 🔥
            this.BusinessSubCatType = Array.from(
              new Map(
                res.map(item => [
                  item.businessSubCatId,
                  {
                    id: item.businessSubCatId,
                    name: item.subCatName
                  }
                ])
              ).values()
            );

            // reset downstream
            this.selectedBusinessSubCatType = null;
            this.rweServiceOrProduct = [];

            console.log('Sub Categories:', this.BusinessSubCatType);
          },
          error: err => console.error(err)
        });
    }
  }
  onSubCategoryChange(subCatId: number) {
    this.selectedServiceOrProduct = null;

    this.ServiceOrProductOptions = this.allServiceOrProducts
      .filter(p => p.businessSubCatId === subCatId)
      .map(p => ({
        id: p.serviceOrProductId,
        name: p.serviceOrProductName
      }));
  }
  onProductChange(productId: number) {
    const product = this.allServiceOrProducts.find(
      p => p.serviceOrProductId === productId
    );

    if (!product) return;

    this.sellingPrice = product.sellingPrice;
    this.unit = product.unit;
    this.margin = product.margin;
  }


  resetProductDetails() {
    this.sellingPrice = null;
    this.unit = null;
    this.margin = null;
  }
  onBusinessTypeChange(event: Event) {
    const businessTypeId = Number(
      (event.target as HTMLSelectElement).value
    );

    // reset everything below
    this.BusinessSubCatType = [];
    this.rweServiceOrProduct = [];
    this.selectedBusinessSubCatType = null;
    this.selectedServiceOrProduct = null;
    this.resetProductDetails();

    if (!businessTypeId) return;

    this.serviceApi
      .getServiceOrProductByBusinessType(businessTypeId)
      .subscribe({
        next: data => {
          this.allServiceOrProducts = data;

          // UNIQUE sub categories
          const map = new Map<number, string>();
          data.forEach(item => {
            if (!map.has(item.businessSubCatId)) {
              map.set(item.businessSubCatId, item.subCatName);
            }
          });

          this.BusinessSubCatType = Array.from(map.entries()).map(
            ([id, name]) => ({ id, name })
          );
        },
        error: err => console.error(err)
      });
  }

}



