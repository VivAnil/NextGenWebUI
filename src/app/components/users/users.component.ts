import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table'; // Import PrimeNG Table reference
import { style } from '@angular/animations';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {SexOption} from '../../models/master.model';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit,  AfterViewInit  {
  userdetailsApiUrl: string = environment.userdetailsApiUrl;
  private isVisible: boolean = false;
  @ViewChild('dt') dt: Table | undefined; // Access the table reference
  data: any[] = [];
  cols: any[] = []; // Table columns
  filteredData: any[] = []; // Data to display in the grid
  dataKey: string = ''; // Identifies which data to fetch
  globalFilterFields: string[] = []; // Fields for global search
  pageHead:string='Project Officer Master';
  companyId!: number;
  roleId!: number;
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
  filters: { [key: string]: string } = {}; // Stores filter values
  showFilterModal = false; // Controls filter modal visibility
  addUser: string = 'dv_addSProjectOfficer';
  private genders: SexOption[] = [];
  serPillarData: any[] = [];
  selectedOption: any; // Holds the selected value
  loading: boolean = true; // Set initial loading state
  showColumnModal = false; // Modal visibility control
  filteredCols: string[] = ["middleName", "address","panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId"];
  
  sexOptions: { id: number; name: string }[] = [];
  formData = {
    Id: '',
    ProfilePicture: '',
    FirstName:'',
    MiddleName:'',
    LastName:'',
    DOB:'',
    Sex:'',
    Mobile:'',
    Email:'',
    ProjectName:'',
    StateId:'',
    DistrictId:'',
    BlockId:'',
    Village:'',
    GramPanchayat:'',
    PinCode:'',
    Address:'',
    AccountHolderName:'',
    AccountNo: '',
    BankName: '',
    IFSCCode: '',
    BankBranch: '',
    CancelledCheque: '',
    PAN:'',
    PANImage: '',
    Aadhar:'',
    AadharImage: ''
};

  constructor(private route: ActivatedRoute, private serviceApi: ApiService, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = +params['companyid'];
      this.roleId=+params['roleid'];
      console.log ('companyId = ' +this.companyId + ' and Role id ' + this.roleId);
    });

    this.cols = [
   
      // {
      //   header: "Profile", field: function (value: any, item: any) {
      //       return "<div><img src='"+item.profilePicture+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.id+" </div>";
      //   }, type: "text"
      // },
      { header: 'ID', field: 'profilePicture', type: "text", class: "text-align-center width8em word-break-all", search:true, showInGrid:true},//profilePictur
        { header: '', field: 'id', type: "text", class: "text-align-center width8em word-break-all", search:false, showInGrid:true},//profilePicture
     
      { header: 'First Name', field: 'firstName', type: "text", css: "text-align-center width16em word-break-all", visible: true, search:true, showInGrid:true },
      { header: 'Last Name', field: 'lastName', type: "text", css: "text-align-center width14em word-break-all", visible: true, search:true, showInGrid:true },
      { header: 'DOB', field: 'dob',  type: "text", css: "text-align-center width12em word-break-all", visible: true, search:false},
      { header: 'Sex' , field: 'sex', type: "text", css: "text-align-center width10em word-break-all",visible: true, search:true },
      { header: "Mobile No.", field: "mobile", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Email Id", field: "email", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Project Name", field: "projectName", type: "text", css: "text-align-center width14em word-break-all" ,visible: true, search:true },
      { header: "State", field: "stateName", type: "text", css: "text-align-center width10em" ,visible: true, search:true },
      { header: "District", field: "districtame", type: "text", css: "text-align-center width10em word-break-all" ,visible: true , search:true},
      { header: "Block", field: "blockName", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Village", field: "village", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Pin Code", field: "pinCode", type: "text", css: "text-align-center width8em word-break-all" ,visible: true, search:true },
      { header: "PAN Card", field: "pan", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Aadhar", field: "aadhar", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },

    ];
        // Listen to the route to determine which dataset to load
        this.route.url.subscribe((url) => {
          if (url[2]?.path === '2') {
            this.dataKey = 'pc';
            this.pageHead='Project Officer';
          } else if (url[2]?.path === '4') {
            this.dataKey = 'dc';
            this.pageHead='District Coordinator';
          } else if (url[2]?.path === '5') {
            this.dataKey = 'bc';
            this.pageHead='Block Coordinator';
          } else if (url[2]?.path === '3') {
            this.dataKey = 'sp';
            this.pageHead='Soochnapreneur';
          }

          console.log('Data key = ' + this.dataKey);
         // this.inituserDetailsGrid(); // Fetch data based on the dataKey
         this.loadData();
        });

  }
  loadData():void{
    this.serviceApi.fetchUserDetails(this.userdetailsApiUrl+this.companyId+'/'+this.roleId, this.dataKey).subscribe({
      next: (response) => {
        this.data = response; // Populate the grid with fetched data
        this.filteredData = [...this.data]; // Clone the full data initially
        // // Dynamically set columns based on API keys
        if (this.data.length > 0) {
         this.cols = Object.keys(this.data[0]).map((key) => ({
            field: key,
            header: this.capitalizeFirstLetter(key),
            visible: this.checkVisible(key),
            width: '100px' ,
            search: this.searchable(key),
            showInGrid:this.checkVisible(key)
          }));

           // Set fields for global filtering
          this.globalFilterFields = Object.keys(this.filteredData[0]);
          this.globalFilterFields=this.cols;
          this.loading = false; // Turn off loading once data is fetched
          console.log(this.cols);
          // Initialize filters for each column
          this.cols.forEach((col) => {
            if (!this.filteredCols.includes(col.field))
              if(this.checkVisible(col.field))
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
         return this.serviceApi.getuserDetails(this.userdetailsApiUrl+this.companyId+'/'+this.roleId).toPromise();
       },
     },
     fields: [
      {
        title: "ID", itemTemplate: function (value: any, item: any) {
            return "<div><img src='"+item.profilePicture+"' style='width:45px; height:45px; line-height:45px; border-radius:100%;' > "+item.id+" </div>";
        }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em word-break-all"
      },
      //{ title: "Profile Pic", name: "profilePicture", type: "text", validate: "required", css: "width10em text-align-center" },
      //{ title: "ID", name: "id", type: "text", validate: "required", css: "width6em text-align-center" },
      { title: "First Name", name: "firstName", type: "text", validate: "required", css: "width10em text-align-center word-break-all"  },
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
  onSelectionChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('Selected Option ID:', selectedId);
    this.selectedOption = selectedId;

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

  assignProject(){
    
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
      else if (key == 'profilePicture')
      {
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

  loadModal(modalId: string) {
    const modalButton = document.getElementById('btn_openModal');
    if (modalButton) {
      this.fetchMasterData();
      modalButton.setAttribute('data-bs-target', `#${modalId}`);
      modalButton.click(); // Programmatically trigger the button to open the modal
    }
  }

    // Form submission logic
    submitForm() {
      if (!this.formData.FirstName || !this.formData.LastName) {
        return; // Prevent submission if mandatory fields are empty
      }
  
      const payload = {
        ...this.formData
      };
  
      // Handle form submission logic (e.g., post to an API)
      console.log('Submitting form data:', payload);
    }

    fetchMasterData() {
      this.http.get<SexOption[]>('https://api.example.com/sexOptions').subscribe(
        (response: SexOption []) => {
          this.sexOptions = response;
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to fetch sex options', error);
        }
      );
    }
}



