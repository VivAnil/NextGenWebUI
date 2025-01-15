import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { Table } from 'primeng/table'; // Import PrimeNG Table reference
import { style } from '@angular/animations';
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
  dataKey: string = ''; // Identifies which data to fetch
  globalFilterFields: string[] = []; // Fields for global search

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

  serPillarData: any[] = [];
  selectedOption: any; // Holds the selected value


  
  constructor(private route: ActivatedRoute, private serviceApi: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.companyId = +params['companyid'];
      this.roleId=+params['roleid'];
      console.log ('companyId = ' +this.companyId + ' and Role id ' + this.roleId);
    });

    this.cols = [
      { header: 'ID', field: 'id', type: "text", class: "text-align-center width8em word-break-all"},
     
      { header: 'First Name', field: 'firstName', type: "text", css: "text-align-center width16em word-break-all" },
      { header: 'Last Name', field: 'lastName', type: "text", css: "text-align-center width14em word-break-all" },
      { header: 'DOB', field: 'dob',  type: "text", css: "text-align-center width12em word-break-all"},
      { header: 'Sex' , field: 'sex', type: "text", css: "text-align-center width10em word-break-all"},
      { header: "Mobile No.", field: "mobile", type: "text", css: "text-align-center width10em word-break-all" },
      { header: "Email Id", field: "email", type: "text", css: "text-align-center width10em word-break-all" },
      { header: "Project Name", field: "projectName", type: "text", css: "text-align-center width14em word-break-all" },
      { header: "State", field: "stateName", type: "text", css: "text-align-center width10em" },
      { header: "District", field: "districtame", type: "text", css: "text-align-center width10em word-break-all" },
      { header: "Block", field: "blockName", type: "text", css: "text-align-center width10em word-break-all" },
      { header: "Village", field: "village", type: "text", css: "text-align-center width10em word-break-all" },
      { header: "Pin Code", field: "pinCode", type: "text", css: "text-align-center width8em word-break-all" },
      { header: "PAN Card", field: "pan", type: "text", css: "text-align-center width10em word-break-all" },
      { header: "Aadhar", field: "aadhar", type: "text", css: "text-align-center width10em word-break-all" },

    ];
        // Listen to the route to determine which dataset to load
        this.route.url.subscribe((url) => {
          if (url[2]?.path === '2') {
            this.dataKey = 'pc';
          } else if (url[2]?.path === '4') {
            this.dataKey = 'dc';
          } else if (url[2]?.path === '5') {
            this.dataKey = 'bc';
          } else if (url[2]?.path === '3') {
            this.dataKey = 'sp';
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
        // // Dynamically set columns based on API keys
        if (this.data.length > 0) {
        //  this.cols = Object.keys(this.data[0]).map((key) => ({
        //     field: key,
        //     header: this.capitalizeFirstLetter(key),
        //   }));

           // Set fields for global filtering
          //this.globalFilterFields = Object.keys(this.data[0]);
          this.globalFilterFields=this.cols;
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
  addProjectOficer(){

  }
  assignProject(){
    
  }
  onGlobalFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value; // Cast to HTMLInputElement
    this.dt?.filterGlobal(inputValue, 'contains');
  }
    // Utility function to format headers
    capitalizeFirstLetter(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1');
    }
}

