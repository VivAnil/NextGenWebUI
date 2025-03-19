import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
declare var $: any; // Import jQuery

@Component({
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.css'],
 // imports: [FormsModule]
})
export class BeneficiaryComponent implements OnInit {

  userdetailsApiUrl: string = environment.userdetailsApiUrl;
  private isVisible: boolean = false;
  @ViewChild('dt') dt: Table | undefined; // Access the table reference
  data: any[] = [];
  cols: any[] = []; // Table columns
  filteredData: any[] = []; // Data to display in the grid
  dataKey: string = ''; // Identifies which data to fetch
  globalFilterFields: string[] = []; // Fields for global search
  pageHead:string='Beneficiary';
  companyId!: number;
  roleId!: number;
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
  filteredCols: string[] = ["middleName", "address","panImage", "aadharImage", "role", "companyName", "managerId", "sexId", "stateId", "districtId", "blockId", "bankDetailsId", "userName", "password", "companyRoleId", "active", "companyId", "projectId"];
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
projectList: { projectId: number, projectName: string }[] = [];
soochnapreurList: { soochnapreneurId: number, soochnapreneur: string }[] = [];
  constructor(private route: ActivatedRoute, private serviceApi: ApiService, private http: HttpClient,  private fb: FormBuilder, private menuService: MenuService) { }

  ngOnInit(): void {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    this.companyId = userRoleSettings.companyId; 
    this.roleId = userRoleSettings.systemRoleId; 
    this.companyRoleId = userRoleSettings.companyRoleId; 
    this.route.params.subscribe((params) => {
      this.companyId = +params['companyid'];
      this.roleId=+params['roleid'];
      console.log ('companyId = ' +this.companyId + ' and Role id ' + this.roleId);
    });

    this.cols = [
  
      { header: 'ID', field: 'profilePicture', type: "text", class: "text-align-center width8em word-break-all", search:true, showInGrid:true},//profilePictur
        { header: '', field: 'id', type: "text", class: "text-align-center width8em word-break-all", search:false, showInGrid:true},//profilePicture
     
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
        });
         this.loadData();
         this.updatePath();
         this.setMaxDate();
  }
  loadData() {
    this.serviceApi.fetchBeneficiaries(this.userdetailsApiUrl+this.companyId+'/0/0', this.dataKey).subscribe({
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
        //  console.log(this.cols);
          // Initialize filters for each column
          this.cols.forEach((col) => {
            if (!this.filteredCols.includes(col.field))
              if(this.checkVisible(col.field))
                this.filters[col.field] = '';
          });
         
          // Extract unique projectId & projectName
        const projectMap: { [key: number]: string } = {};
        response.forEach(item => {
          if (item.projectId && item.projectName) {
            projectMap[item.projectId] = item.projectName;
          }
        });

        this.projectList = Object.keys(projectMap).map(id => ({
          projectId: +id,
          projectName: projectMap[+id]
        }));
        console.log('ProjectList = ' + JSON.stringify(this.projectList));
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
        console.log('soochnapreurList = ' + JSON.stringify(this.soochnapreurList));
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.data = []; // Set an empty array if there's an error
      }
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
        let userString = localStorage.getItem('userRoleSettings');
        let userRoleSettings = userString ? JSON.parse(userString) : null;
      //  this.addBeneficiary();
        // if (userRoleSettings != null) {
        //   this.router.navigate(['organisation']);
        // }
        // else {
        //   ValidateForm.validateForm(this.benForm);
        // }
       
      }
      else {
        // Show an error message if login fails
        ValidateForm.validateForm(this.benForm);
      }
      
    }
    addBeneficiary() {
      const formData = this.benForm.value;
      const payload = {
        Name: formData.companyname,
        Address: formData.address,
        Url: formData.url,
        ContactPerson: formData.contactperson,
        Email: formData.email,
        Mobile: formData.mobile,
        Logo: this.profileBase64, // Can be null
        Username: formData.username,
        Password: formData.password
      };
      this.serviceApi.saveBeneficiary(payload).subscribe({
        next: (response) => {
          console.log('resoonse = ', response);
          if (response == 1)
          {
            alert('Company added successfully!');
          }
          else if (response == 100)
          {
            alert('Company already exists');
          }
          else{
            console.error('Add Company Failed:', response);
            alert('Failed to add company.');
          }
        },
        error: (err) => {
          console.error('Add Company Failed:', err);
          alert('Failed to add company.');
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
