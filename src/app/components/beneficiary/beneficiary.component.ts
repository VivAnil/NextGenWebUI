import { AfterViewInit, Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute, Event as RouterEvent  } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table'; // Import PrimeNG Table reference
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {SexOption} from '../../models/master.model';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import ValidateForm from 'src/app/helpers/validateForm';
import { MenuService } from 'src/app/services/menu.service';
import { Service } from 'src/app/models/service.model';
import { RWEBusinessFilters, RweBusiness, RweBusinessProduct, RweBusinessSubCatType, RweBusinessType, rweBusiness } from '../../services/rweBusiness.service';
declare var $: any; // Import jQuery

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css'],
 // imports: [FormsModule]
})
export class BeneficiaryComponent implements OnInit {
  rweBusinesses: RweBusiness[] = [];
  rweBusinessfilters: RWEBusinessFilters | undefined;
  rweBusinessType: RweBusinessType[] | undefined;
  rweBusinessSubCatType: RweBusinessSubCatType[] | undefined;
  rweServiceOrProduct: RweBusinessProduct[] | undefined;
  selectedRwe: any = "";

  selectedBusinessId: number | '' = '';
  isAddingNewBusiness: boolean = false;
  newBusinessName: string = '';
  selectedRWEBusinessType: any = "";
  selectedRWEBusinessSubCatType: any ="";
  selectedRWEServiceOrProduct: any ="";
  selectedStartMonth: number = 0;
  selectedStartYear: number = 2026;
  selectedInventoryUnit: any = "Other";
  selectedInventory: number =0;
  totalInvestment: number = 0;
  selfInvestment: number = 0;
  projectLoan: number = 0;
  bankLoan: number = 0;
  collectiveLoan: number = 0;
  hideSaveRWE: boolean = false;
  userdetailsApiUrl: string = environment.userdetailsApiUrl;
  private isVisible: boolean = false;
  @ViewChild('dt') dt: Table | undefined; // Access the table reference
  data: any[] = [];
  cols: any[] = []; // Table columns
  years: any[] = [];
  filteredData: any[] = []; // Data to display in the grid
  rwes: any[] = [];
  filteredRwes: any[] = [];  // filtered list
  rweSearch: string = '';
  casteData: { id: number; name: string }[] = [];
  economicStatusData: { id: number; name: string }[] = [];
  selectedCaste: { id: number; name: string } | undefined;
  selectedEconomicStatus: { id: number; name: string } | undefined;
  dataKey: string = ''; // Identifies which data to fetch
  globalFilterFields: string[] = []; // Fields for global search
  pageHead: string = 'RWE';
  companyId!: number;
  roleId!: number;
  projectId: any;
  projectName: string = 'none';
  companyRoleId!: number;
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
  projId!: number ;
  filteredCols: string[] = ["profilePicture", "dob", "fathersName", "middleName", "address", "panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId", "projectName", "pan", "pinCode", "aadhar", "soochnapreneurId", "bankName",
    "ifsc", "totalBeneficiaries", "totalRevenue", "totalRevenueByIncentives", "totalRevenueByServices", "totalServices", "dateOfRegistration", "economicStatusId", "educationId",
    "email", "soochnapreneur", "totalServices", "casteId", "services", "economicStatus", "gramPanchayat", "caste", "accountName"
  ];
  benForm!: FormGroup;
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
maxDate: string = ''; // for limiting future dates in DOB
states: any[] = [];
districts: any[] = [];
blocks: any[] = [];
selectedProfile: File | null = null;
profileBase64: string | null = null;
selectedPan: File | null = null;
panBase64: string | null = null;
selectedAadhar: File | null = null;
aadharBase64: string | null = null;
selectedState: number =0;
selectedDistrict: number =0;
selectedBlock: number | null = null;
servicePillarData :Service[] | undefined;
serviceName:Service[] | undefined;
selectedBusinesses:Service[] | undefined;
userName!:string;
projectList: { projectId: number, projectName: string }[] = [];
soochnapreurList: { soochnapreneurId: number, soochnapreneur: string }[] = [];
    businessFilter: any;

  constructor(private route: ActivatedRoute, private serviceApi: ApiService, private http: HttpClient,  private fb: FormBuilder, private menuService: MenuService, private renderer: Renderer2,private rweBusinessService: rweBusiness) { }

  ngOnInit(): void {
    let yr = new Date().getFullYear();
    this.years = [];

    while (yr >= 2020) {
      this.years.push(yr--);
    }
    this.serviceApi.getData().subscribe({
    next:  (response: Service[]) => {
      this.servicePillarData = this.getDistinctServicePillars(response);
    }
  });

    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    this.companyId = userRoleSettings.companyId; 
    this.roleId = userRoleSettings.systemRoleId; 
    this.companyRoleId = userRoleSettings.companyRoleId; 
    this.userName = userRoleSettings.username;

    this.route.params.subscribe((params) => {
      this.companyId = +params['companyid'];
      this.roleId=+params['roleid'];
      console.log ('companyId = ' +this.companyId + ' and Role id ' + this.roleId);
    });

    this.cols = [
  
      //{ header: 'ID', field: 'profilePicture', type: "text", class: "text-align-center width8em word-break-all", search:true, showInGrid:true},//profilePictur
      // { header: '', field: 'id', type: "text", class: "text-align-center width8em word-break-all", search:false, showInGrid:true},//profilePicture
     
      { header: 'First Name', field: 'firstName', type: "text", css: "text-align-center width16em word-break-all", visible: true, search:true, showInGrid:true },
      { header: 'Last Name', field: 'lastName', type: "text", css: "text-align-center width14em word-break-all", visible: true, search:true, showInGrid:true },
      { header: 'Fathers Name', field: 'fathersName', type: "text", css: "text-align-center width14em word-break-all", visible: true, search:true, showInGrid:true },
      { header: 'DOB', field: 'dob',  type: "text", css: "text-align-center width12em word-break-all", visible: true, search:false},
      { header: 'Sex' , field: 'sex', type: "text", css: "text-align-center width10em word-break-all",visible: true, search:true },
      { header: "Mobile No.", field: "mobile", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Email Id", field: "email", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Project Name", field: "projectName", type: "text", css: "text-align-center width14em word-break-all" ,visible: true, search:true },
      { header: "State", field: "stateName", type: "text", css: "text-align-center width10em" ,visible: true, search:true },
      { header: "District", field: "districtame", type: "text", css: "text-align-center width10em word-break-all" ,visible: true , search:true},
      { header: "Block", field: "blockName", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Village", field: "village", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Address", field: "address", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Pin Code", field: "pinCode", type: "text", css: "text-align-center width8em word-break-all" ,visible: true, search:true },
      { header: "PAN Card", field: "pan", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },
      { header: "Aadhar", field: "aadhar", type: "text", css: "text-align-center width10em word-break-all" ,visible: true, search:true },

    ];
    
     this.benForm= this.fb.group({
          firstname: ['', Validators.required],
          middlename:[''],
          lastname:[''],
          fathersname:[''],
          dob: ['', Validators.required],
          age: [{ value: '', disabled: false }],
          //sex
          email: ['', [Validators.email]],
          mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          village:[''],
          address: [''],
          grampanchayat: [''],
          pincode: [''],
          pan:[''],
          aadhar:[''],
          panimage:'',
          aadharimage:'',
          url:'',
          profilephoto:'',
          sexId: ['', Validators.required],
          projectId: ['', Validators.required],
          soochnapreurId: ['', Validators.required],
          stateId: ['', Validators.required],
          districtId: ['', Validators.required],
          blockId: ['', Validators.required],

            // Schemes
          schemeName: [''],
          grantAmount: [''],
          schemeStartDate: [''],
          schemeSubsidyAmount: [''],

    // Business unit
        startDate: ['']
        });
         this.loadData();
         this.updatePath();
         this.setMaxDate();

    //  this.serviceApi.getCastes().subscribe({
    //   next: data => this.casteData = data,
    //   error: err => console.error(err)
    // });

    //  this.serviceApi.getEconomicStatus().subscribe({
    //   next: data => this.economicStatusData = data,
    //   error: err => console.error(err)
    // });
  }

  filterRwes() {
    const value = this.rweSearch?.toLowerCase().trim();

    // 🔹 If input is empty → remove filter
    if (!value) {
      this.filteredRwes = [...this.rwes];
      return;
    }

    // 🔹 Apply filter
    this.filteredRwes = this.rwes.filter(rwe =>
      rwe.rweName.toLowerCase().includes(value)
    );
  }
  
  getDistinctServicePillars(services: Service[]): Service[] {
    const seen = new Set<string>();
    return services.filter(service => {
      if (seen.has(service.servicePillarName)) {
        return false;
      }
      seen.add(service.servicePillarName);
      return true;
    });
  }
  loadData() {
 
    this.serviceApi.fetchBeneficiaries(this.userdetailsApiUrl+this.companyId+'/0/0', this.dataKey).subscribe({
      next: (response) => {
        // this.data = response; // Populate the grid with fetched data
        this.data = response.map((item: any, index: number) => ({
          srNo: index + 1,
          ...item
        }));
        this.rwes = this.data.map((item: any) => ({
          id: item.id,
          rweName: item.firstName + ' ' + item.lastName
        }));
        this.filterRwes();
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
        //  console.log(this.cols);
          // Initialize filters for each column
          this.cols.forEach((col) => {
            if (!this.filteredCols.includes(col.field))
              if(this.checkVisible(col.field))
                this.filters[col.field] = '';
          });
         
          // Extract unique projectId & projectName
        const projectMap: { [key: number]: string } = {};
          var count = 0;
        response.forEach(item => {
          if (item.projectId && item.projectName) {
            projectMap[item.projectId] = item.projectName;
          }
        });

        this.projectList = Object.keys(projectMap).map(id => ({
          projectId: +id,
          projectName: projectMap[+id]
        }));
        // Extract unique soochnapreneurId & soochnapreneur
        const smMap: { [key: number]: string } = {};
        response.forEach(item => {
          if (item.soochnapreneurId && item.soochnapreneur) {
            smMap[item.soochnapreneurId] = item.soochnapreneur;
          }
        });

        this.soochnapreurList = Object.keys(smMap).map(id => ({
          soochnapreneurId: +id,
          soochnapreneur: smMap[+id]
        }));
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.data = []; // Set an empty array if there's an error
      }
    });

    this.rweBusinessService.getRWEBusinessFilters().subscribe({
      next: (data) => {
        this.rweBusinessfilters = data;
        this.rweBusinessType = this.rweBusinessfilters?.rweBusinessType;
        this.rweBusinessSubCatType = this.rweBusinessfilters?.rweBusinessSubCatType;
        this.rweServiceOrProduct = this.rweBusinessfilters?.rweServiceOrProduct;
        console.log('Filters:', this.rweBusinessfilters);
      },
      error: (err) => console.error('Error fetching rwe business filters:', err)
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
 onProjectChange(event: Event): void {
  const select = event.target as HTMLSelectElement;
  const selectedOption = select.options[select.selectedIndex];

  this.projectId = selectedOption.id;         // ✅ gets option's id
  this.projectName = selectedOption.value;    // ✅ gets option's value
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

   showAllSchemes(): void {
    const rows = document.querySelectorAll('tr.tr-scheme');
    rows.forEach(row => {
      if (row.classList.contains('display-none')) {
        this.renderer.removeClass(row, 'display-none');
        this.renderer.addClass(row, 'display-block'); // optional if you want to force block
      }
      else{
         this.renderer.removeClass(row, 'display-block');
        this.renderer.addClass(row, 'display-none'); // optional if you want to force block
      }
    });
  }
  showAllUnit(): void {
    const rows = document.querySelectorAll('tr.tr-unit');
    rows.forEach(row => {
      if (row.classList.contains('display-none')) {
        this.renderer.removeClass(row, 'display-none');
        this.renderer.addClass(row, 'display-block'); // optional if you want to force block
      }
      else{
         this.renderer.removeClass(row, 'display-block');
        this.renderer.addClass(row, 'display-none'); // optional if you want to force block
      }
    });
  }
 onGlobalFilter(query: string): void {
  const q = (query ?? '').toLowerCase();
  this.filteredData = this.data.filter(x =>
    JSON.stringify(x).toLowerCase().includes(q)
  );
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
     // console.log(key);
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
    const modalButtonBusiness = document.getElementById('btn_openModalBusiness');
    if (modalButton) {
      this.fetchMasterData();
      modalButton.setAttribute('data-bs-target', `#${modalId}`);
      modalButton.click(); // Programmatically trigger the button to open the modal
    }

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
      this.http.get<SexOption[]>('https://motherappmasterapi.azurewebsites.net/api/Gender/GetAllGender').subscribe(
        (response: SexOption []) => {
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

        if (this.districts.length > 0)
        {
          this.benForm.patchValue({ districtId: '', blockId: '' });
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
        this.selectedBlock = this.blocks[0].id; 
        this.benForm.patchValue({ blockId: '' });
        console.log('this.selectedBlock = ' + this.selectedBlock);
      },
      (error) => {
        console.error('Error fetching blocks:', error.message);
      }
    );
  }
onServiceProductNameChange(event: any): void {
  const serviceId = Number(event.target.value); // ✅ convert to number

  this.serviceApi.getData().subscribe({
    next: (response: Service[]) => {
      this.selectedBusinesses = response.filter(s => s.id === serviceId);
    }
  });
}
 onServiceNameChange(event: any): void {
  const serviceId = Number(event.target.value); // ✅ convert to number

  this.serviceApi.getData().subscribe({
    next: (response: Service[]) => {
      this.serviceName = response.filter(s => s.servicePillarId === serviceId);
    }
  });
}
   // On state selection change
   onStateChange(event: any): void {
    const stateId = event.target.value;
    this.selectedState=stateId;
    if (this.selectedState) {
      this.getDistricts(this.selectedState);
    }
  }

  // On district selection change
  onDistrictChange(event: any): void {
    const districtId = event.target.value;
    this.selectedDistrict=districtId;
    if (this.selectedDistrict) {
      this.getBlocks(this.selectedDistrict);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedProfile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.profileBase64 = (reader.result as string).split(',')[1]; // Extract Base64 only
      };
      reader.readAsDataURL(file);
    }
  }
  onAadharSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedAadhar = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.aadharBase64 = (reader.result as string).split(',')[1]; // Extract Base64 only
      };
      reader.readAsDataURL(file);
    }
  }
  onPanSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedPan = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.panBase64 = (reader.result as string).split(',')[1]; // Extract Base64 only
      };
      
      reader.readAsDataURL(file);
    }
  }
  onSave() {
      console.log(this.benForm.value);
          if (this.benForm.valid) {
            //call service
            this.addBeneficiary();
          }
          else {
            ValidateForm.validateForm(this.benForm);
          }
      
  }

  onSaveRweBusiness() {
    const rweBusiness: any = {
      id: (this.isAddingNewBusiness ? 0 : (Number(this.selectedBusinessId) || 0)),
      rweId: this.selectedRwe,

      businessName: this.isAddingNewBusiness ? (this.newBusinessName || '').trim() : undefined,
      businessTypeId: this.selectedRWEBusinessType,
      businessSubCatTypeId: this.selectedRWEBusinessSubCatType,
      serviceOrProductId: this.selectedRWEServiceOrProduct,
      startMonth: this.selectedStartMonth,
      startYear: this.selectedStartYear,
      inventory: this.selectedInventory,
      inventoryUnit: this.selectedInventoryUnit,
      totalInvestment: this.totalInvestment,
      selfInvestment: this.selfInvestment,
      bankLoan: Number(this.bankLoan) || 0,
      projectLoan: Number(this.projectLoan) || 0,
      collectiveLoan: Number(this.collectiveLoan) || 0
    };
    this.rweBusinessService.saveRweBusiness(rweBusiness).subscribe({
      next: () => {
        if (this.isAddingNewBusiness) {
          // add to dropdown immediately (server may return real id in API; adjust if your API returns it)
          rweBusiness.businessName = (this.newBusinessName || '').trim();
          this.rweBusinesses.unshift(rweBusiness);
          this.selectedBusinessId = rweBusiness.id;
          this.isAddingNewBusiness = false;
          this.newBusinessName = '';
        } else {
          // update existing item in dropdown
          const idx = this.rweBusinesses.findIndex((x: any) => x.id == rweBusiness.id);
          if (idx >= 0) this.rweBusinesses[idx] = { ...this.rweBusinesses[idx], ...rweBusiness };
        }
        this.hideSaveRWE = !this.hideSaveRWE;
        alert('RWE Business saved successfully!');
      },
      error: (err) => console.error('Error saving RWE Business:', err)
    });
  }
    addBeneficiary() {
      const formData = this.benForm.value;
     const schemeData = {
    id: 0,
    spId: Number(formData.soochnapreurId),
    nameOfScheme: formData.schemeName,
    grantOrLoanAmount: Number(formData.grantAmount),
    startDate: formData.schemeStartDate + 'T00:00:00Z', // ISO format
    subsidyAmount: Number(formData.schemeSubsidyAmount)
  };
      console.log(schemeData);
      console.log(this.selectedBusinesses);
      let schemes: any[] = [];
      schemes.push(schemeData);
     const payload = {
  firstname: formData.firstname,
  middlename: formData.middlename,
  lastname: formData.lastname,
  fathersname: formData.fathersname,
  dob: formData.dob + 'T00:00:00Z',
  email: formData.email,
  mobile: formData.mobile,
  village: formData.village,
  address: formData.address,
  pincode: formData.pincode,
  PanCard: formData.pan,
  aadhar: formData.aadhar,
  url: formData.url,
  panimage: this.panBase64,
  aadharimage: this.aadharBase64,
  profilephoto: this.profileBase64,
  sex: formData.sexId,
  projectId:  Number(this.projectId),
  SoochnaPreneurId: formData.soochnapreurId,
  StateId: Number(formData.stateId),
  DistrictId: Number(formData.districtId),
  BlockId: Number(formData.blockId),
  CompanyId: this.companyId,
  projectName: this.projectName,
  LastUpdateBy: this.userName,
  gramPanchayat: formData.gramPanchayat,
  schemes: schemes,              // ✅ use the array you built
  businesses: this.selectedBusinesses ?? [], // ✅ or whatever you collect
  casteId: this.selectedCaste?.id,
  economicStatusId: this.selectedEconomicStatus?.id,
  casteName: this.selectedCaste?.name,
  economicStatusName: this.selectedEconomicStatus?.name
};
    this.serviceApi.saveBeneficiary(payload).subscribe({
      next: (response) => {
        console.log('Response = ', response);
        if (response == 1) {
          alert('Beneficiary Added Successfully!');
        }
        else {
          console.error('Save Beneficiary Failed: ', response);
          alert('Failed to Add Beneficiary.');
        }
      },
      error: (err) => {
        console.error('Save Beneficiary Failed: ', err);
        alert('Failed to Add Beneficiary.');
      }
    });
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
          title: 'Business Section',
          links: [
            { label: 'View All Products', path: '/businessproduct' }
          ]
        },
        {
          title: 'Payment Section',
          links: [
          ]
        }
      ]);
    }
    setMaxDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      this.maxDate = `${yyyy}-${mm}-${dd}`; // e.g., 2025-03-09
  }
    selectEconomicStatus(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;

        this.selectedEconomicStatus = {
          id: Number(selectElement.value),          // convert string → number
          name: selectElement.options[selectElement.selectedIndex].text // get label text
        };
  }

selectCaste(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;

  this.selectedCaste = {
    id: Number(selectElement.id),          // convert string → number
    name: selectElement.options[selectElement.selectedIndex].text // get label text
  };
}

  // List of all filter fields in your component
  filterFields = [
    'selectedRwe',
    'selectedRWEBusinessType',
    'selectedRWEBusinessSubCatType',
    'selectedRWEServiceOrProduct'
  ];

  // Call this whenever any filter changes

  // ✅ Called when RWE dropdown changes (loads businesses for selected RWE)
  onRweChange(): void {
    if (!this.selectedRwe || this.selectedRwe === '') {
      this.rweBusinesses = [];
      this.selectedBusinessId = '';
      this.isAddingNewBusiness = false;
      this.newBusinessName = '';
      return;
    }
    // load businesses and reset business selection
    this.selectedBusinessId = '';
    this.isAddingNewBusiness = false;
    this.newBusinessName = '';
    this.clearRweBusinessFormFields();
    this.loadRweBusinesses();
  }


  onBusinessChange(): void {

    console.log("selectedBusinessId:", this.selectedBusinessId);

    if (this.selectedBusinessId === -1) {
      this.isAddingNewBusiness = true;
      this.newBusinessName = '';
      this.clearRweBusinessFormFields();
      return;
    }

    this.isAddingNewBusiness = false;

    const selected = this.rweBusinesses?.find((b: any) => b.id == this.selectedBusinessId);

    console.log("selected business object:", selected);

    if (!selected) {
      this.clearRweBusinessFormFields();
      return;
    }

    // ✅ Assign EXACTLY same data types as your ngModel expects
    this.selectedRWEBusinessType = selected.businessTypeId ?? '';
    this.selectedRWEBusinessSubCatType = selected.businessSubCatTypeId ?? '';
    this.selectedRWEServiceOrProduct = selected.serviceOrProductId ?? '';

    this.selectedInventory = selected.inventory ?? 0;
    this.selectedInventoryUnit = selected.inventoryUnit ?? '';

    this.selectedStartMonth = selected.startMonth ?? 0;
    this.selectedStartYear = selected.startYear ?? 0;

    this.totalInvestment = selected.totalInvestment ?? 0;
    this.selfInvestment = selected.selfInvestment ?? 0;
    this.projectLoan = selected.projectLoan ?? 0;
    this.bankLoan = selected.bankLoan ?? 0;
    this.collectiveLoan = selected.collectiveLoan ?? 0;

    // IMPORTANT: comment this for now, it probably resets values
    // this.displayRweBusinessData();
  }


  private clearRweBusinessFormFields(): void {
    this.selectedRWEBusinessType = '';
    this.selectedRWEBusinessSubCatType = '';
    this.selectedRWEServiceOrProduct = '';

    this.selectedInventory = 0;
    this.selectedInventoryUnit = '';

    this.selectedStartMonth = 0;
    this.selectedStartYear = 0;

    this.totalInvestment = 0;
    this.selfInvestment = 0;
    this.projectLoan = 0;
    this.bankLoan = 0;
    this.collectiveLoan = 0;
  }

  onFilterChange(field: string, event: any): void {
    const value = event.target.value;
    const numberFields = ['selectedRwe', 'selectedRWEBusinessType', 'selectedRWEBusinessSubCatType', 'selectedRWEServiceOrProduct'];
    (this as any)[field] = numberFields.includes(field) && value !== "" ? +value : value;


    // If RWE changes, reload businesses first
    if (field === 'selectedRwe') {
      this.onRweChange();
    } else if (field === 'selectedBusinessId') {
      this.onBusinessChange();
    } else {
      this.displayRweBusinessData();
    }
  }

  // Load businesses from API
  loadRweBusinesses(): void {
    console.log(this.selectedRwe);
    this.rweBusinessService.getAllBusinessesForRwe(this.selectedRwe).subscribe({
      next: (data) => {
        this.rweBusinesses = (data || []).map((b: any) => ({
          ...b,
          businessName: b.businessName || ('Business #' + b.id)
        }));
        this.displayRweBusinessData();
      },
      error: (err) => {
        console.error('Error loading businesses:', err);
        this.rweBusinesses = [];
        this.displayRweBusinessData(); // clear previous selection
      }
    });
  }

  allowedUnits: string[] = ['Kg', 'Litre', 'Pack', 'Piece'];

  // Dynamic display of first filtered business
  displayRweBusinessData(): void {

    if (this.selectedRWEBusinessType) {
      this.rweBusinessSubCatType = this.rweBusinessfilters?.rweBusinessSubCatType!.filter(type => type.businessTypeId === this.selectedRWEBusinessType);
    }
    if (this.selectedRWEBusinessSubCatType) {
      this.rweServiceOrProduct = this.rweBusinessfilters?.rweServiceOrProduct!.filter(type => type.businessSubCatId === this.selectedRWEBusinessSubCatType)
    }
    if (this.selectedRWEServiceOrProduct) {
      if (this.allowedUnits.includes(this.selectedRWEServiceOrProduct.unit)) {
        this.selectedInventoryUnit = this.selectedRWEServiceOrProduct.unit;
      }
      else {
        this.selectedInventoryUnit = 'Other';
      }
    }

    const filtered = this.rweBusinesses.filter(business =>
      this.filterFields.every(field => {
        const filterValue = (this as any)[field];
        const businessFieldMap: any = {
          selectedRwe: 'rweId',
          selectedRWEBusinessType: 'businessTypeId',
          selectedRWEBusinessSubCatType: 'businessSubCatTypeId',
          selectedRWEServiceOrProduct: 'serviceOrProductId'
        };
        const businessField = businessFieldMap[field];
        return filterValue === "" || (business as any)[businessField] === filterValue;
      })
    );

    const firstBusiness = filtered[0];

    if (firstBusiness) {
      this.hideSaveRWE = false;
      Object.assign(this, {
        selectedInventory: firstBusiness.inventory,
        selectedInventoryUnit: firstBusiness.inventoryUnit,
        selfInvestment: firstBusiness.selfInvestment,
        bankLoan: firstBusiness.bankLoan,
        projectLoan: firstBusiness.projectLoan,
        collectiveLoan: firstBusiness.collectiveLoan,
        selectedStartMonth: firstBusiness.startMonth,
        selectedStartYear: firstBusiness.startYear,
        totalInvestment:firstBusiness.totalInvestment
      });
    } else {
      this.hideSaveRWE = true;
      Object.assign(this, {
        selectedInventory: "",
        selectedInventoryUnit: "",
        selfInvestment: "",
        bankLoan: "",
        projectLoan: "",
        collectiveLoan: "",
        selectedStartMonth: "",
        selectedStartYear: "",
        totalInvestment:""
      });
    }
  }

  // Helper to capitalize first letter
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


    calculateAge(event: Event): void {
      const input = event.target as HTMLInputElement;
      const dobValue = input.value;
      if (dobValue) {
        const dobDate = new Date(dobValue);
        const today = new Date();
  
        let age = today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
  
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }
  
        this.benForm.get('age')?.setValue(age);
      } else {
        this.benForm.get('age')?.setValue('');
      }
    }
}
