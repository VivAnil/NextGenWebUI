import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userdetailsApiUrl: string = environment.userdetailsApiUrl;
  
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
      console.log ('companyId = ' +this.companyId);
    });
  }
  ngAfterViewInit(): void {
    this.inituserDetailsGrid();
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
         return this.serviceApi.getuserDetails(this.userdetailsApiUrl+this.companyId+'/2').toPromise();
       },
     },
     fields: [
      { title: "Profile Pic", name: "profilePicture", type: "text", validate: "required", css: "width10em text-align-center" },
      { title: "ID", name: "id", type: "text", validate: "required", css: "width6em text-align-center" },
      { title: "First Name", name: "firstName", type: "text", validate: "required", css: "width10em text-align-center"  },
      { title: "Last Name", name: "lastName", type: "text", css: "width10em" },
      { title: "DOB", name: "dob", type: "text", css: "width10em" },
      { title: "Sex", name: "sex", type: "text", css: "text-align-center width10em" },
      { title: "Mobile No.", name: "mobile", type: "text", css: "text-align-center width10em" },
      { title: "Email Id", name: "email", type: "text", css: "text-align-center width10em" },
      { title: "Project Name", name: "projectName", type: "text", css: "text-align-center width14em" },
      { title: "State", name: "stateName", type: "text", css: "text-align-center width10em" },
      { title: "District", name: "districtame", type: "text", css: "text-align-center width10em" },
      { title: "Block", name: "blockName", type: "text", css: "text-align-center width10em" },
      { title: "Village", name: "village", type: "text", css: "text-align-center width10em" },
      { title: "Pin Code", name: "pinCode", type: "text", css: "text-align-center width8em" },
      { title: "PAN Card", name: "pan", type: "text", css: "text-align-center width10em" },
      { title: "Aadhar", name: "aadhar", type: "text", css: "text-align-center width10em" },
     
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
}
