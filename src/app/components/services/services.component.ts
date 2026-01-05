import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Service } from '../../models/service.model';
import { ApiServicepillar } from 'src/app/services/api.servicepillar';
import { ServicePillar } from '../../models/servicePillar.model';

declare var $: any; // Import jQuery
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
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
  isColumnOpen: boolean = false;
  allowNewService: boolean = false;
  allowNewServicePillar: boolean = false;
  serPillarData: any[] = [];
  selectedOption: any; // Holds the selected value
  servicePillar: ServicePillar =
    {
      Description: '',
      Id: 0,
      Name: '',
      Status: true
    };
  service: Service = {
    id: 0,
    serviceName: '',
    servicePillarId: 0,
    servicePillarName: '',
    //Name: string,
    serviceRate: 0,
    serviceWorth: 0,
    status: false,
    singleTimeAvailability: false,
    spOnly: false,
    advanceFields: false,
  };

  constructor(private serviceApi: ApiService, private servicePillarApi: ApiServicepillar) {

    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    let addNewServicePillarPermission = permissionSettings.filter((setting: { permissionName: string, isAssigned: boolean }) => setting.permissionName === 'Add_Service_Pillar');
    this.allowNewServicePillar = addNewServicePillarPermission?.isAssigned ?? true;
    let addNewServicePermission = permissionSettings.filter((setting: { permissionName: string, isAssigned: boolean }) => setting.permissionName === 'Add_Service');
    this.allowNewService = addNewServicePermission?.isAssigned ?? true;
  }
  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#MappedGrid').jsGrid({
      width: "100%",
      padding: "1%",
      inserting: false,
      height: "auto",
      filtering: false,
      
      loadIndication: false,
      sorting: true,
      paging: true,
      editing: true,
      noDataContent: "No Data found",
      pageIndex: 1,
      //pageSize: $('#<%=ddl_pagesize.ClientID%>').val(),
      pageButtonCount: 100,
      pageSize: 100,
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
         return this.serviceApi.getData().toPromise();
       },
     },
      fields: [
        { title: "Service Id", name: "id", type: "text", validate: "required", css: "width6em text-align-center" },
        { title: "Service Pilalr Id", name: "servicePillarId", type: "text", validate: "required", css: "width6em text-align-center"  },
        { title: "Service Name", name: "serviceName", type: "text", css: "width14em" },
        { title: "Service Pillar Name", name: "servicePillarName", type: "text", css: "width14em" },
        { title: "Sevice Rate", name: "serviceRate", type: "text", css: "text-align-center width6em" },
        { title: "Service Worth", name: "serviceWorth", type: "text", css: "text-align-center width6em" },
        { title: "Status", name: "status", type: "text", css: "text-align-center width6em" },
        { title: "Single Time / Multiple Times", name: "singleTimeAvailability", type: "text", css: "text-align-center width6em" },
        { title: "Only Through SP", name: "spOnly", type: "text", css: "text-align-center width6em" },
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
      //autoload: false,
      loadIndication: false,
      sorting: true,
      paging: true,
      noDataContent: "No Data found",
      pageIndex: 1,
      pageSize: 100,
      //pageSize: $('#<%=ddl_pagesize.ClientID%>').val(),
      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",
      //pageFirstText: "First",
      // pageLastText: "Last",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      //data: this.getDummyData2(),
	   autoload: true,

     controller: {
       loadData: () => {
         return this.servicePillarApi.getData().toPromise();
       },
      },
      fields: [
        { title: "Service Type Name", name: "name", type: "text", validate: "required", css: "width14em" },
        { title: "Description", name: "description", type: "text", css: "width14em" },
        { title: "Status", name: "status", type: "text", css: "text-align-center" },
        // {
        //   title: "Action", itemTemplate: function (value, item) {
        //     return "<div class='text-align-center'><button class='border-none' title='' type='button' data-toggle='modal' data-target='#dv_addOrg'  ><i class='fa fa-edit' title='Edit Shceme'></i></button> <button class='border-none' title='Delete Scheme' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Scheme'></i></button></div>";
        //   }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em"
        // }
      ]
    });
  }

  toggleTab(){
    if(this.displayTab=='none') 
      {
        this.displayTab='block';
        this.activeTab = 'ui-tab ui-tabs-active ui-state-active';
      }
    else 
      {
        this.displayTab='none';
        this.activeTab = 'ui-tab';
      }
    if(this.displayTab1=='none') 
      {
        this.displayTab1='block';
        this.activeTab1 = 'ui-tab ui-tabs-active ui-state-active';
      }
    else 
      {
        this.displayTab1='none';
        this.activeTab1 = 'ui-tab';
      }
  }
  ngOnInit(): void {
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

  onSelectionChange(event: Event): void {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('Selected Option ID:', selectedId);
    this.selectedOption = selectedId;

  }

  saveService() {
    if (!this.service.serviceName.trim()) {
      alert('Service Name is required');
      return;
    }
    this.serviceApi.saveService(this.service)
      .subscribe({
        next: () => {
          alert('Service Pillar saved successfully');
          this.resetServiceForm();
          try {
            // Reload data from controller (uses servicePillarApi.getData())
            $('#MappedGrid').jsGrid('loadData');
          } catch (err) {
            console.error('Failed to refresh Services data', err);
          }
        },
        error: err => {
          console.error(err);
          alert('Error while saving');
        }
      });

  }
  saveServicePillar() {

    if (!this.servicePillar.Name.trim()) {
      alert('Service Pillar Name is required');
      return;
    }

    this.servicePillarApi.saveServicePillarData(this.servicePillar)
      .subscribe({
        next: () => {
          alert('Service Pillar saved successfully');
          this.resetForm();
          try {
            // Reload data from controller (uses servicePillarApi.getData())
            $('#MappedGrid2').jsGrid('loadData');
          } catch (err) {
            console.error('Failed to refresh Service Pillars data', err);
          }
        },
        error: err => {
          console.error(err);
          alert('Error while saving');
        }
      });
  }
  resetServiceForm() {

    this.service = {
      id: 0,
      serviceName: '',
      servicePillarId: 0,
      servicePillarName: '',
      //Name: string,
      serviceRate: 0,
      serviceWorth: 0,
      status: false,
      singleTimeAvailability: false,
      spOnly: false,
      advanceFields: false,
    }
  }
  resetForm() {
    this.servicePillar = {
      Id: 0,
      Name: '',
      Description: '',
      Status: true
    };
  }

  private loadSPData(): void {
    this.serviceApi.getSerPillarData().subscribe(
      (data) => {
        this.serPillarData = data;
        console.log('Dropdown data loaded:', this.serPillarData);
      },
      (error) => {
        console.error('Error loading dropdown data:', error);
      }
    );
  }

   newService(){
    this.loadSPData();
  }

}
