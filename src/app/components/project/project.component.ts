
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
// import * as $ from 'jquery';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
 
})
export class ProjectComponent implements OnInit {

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
  isCheckboxChecked: boolean = false; 
  isPancardChecked: boolean = false;
  isAdhaarChecked: boolean = false;
  isAdhaarIncentive: boolean = false;
  isPANIncentive: boolean = false;
  allowNewProject: boolean = false;
  constructor() {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    let addNewProjectPermission = permissionSettings.filter((setting: { permissionName: string, isAssigned: boolean }) => setting.permissionName === 'Add_Project');
    this.allowNewProject = addNewProjectPermission?.isAssigned ?? true;
  }
  
  stateName = ['Assam', 'Jharkhand', 'Bihar'];
  selectedStates = ['All States'];

  districtName = ['Nagaon', 'Champaran'];
  selectedDistrict = ['All District'];

  blockName = ['Block 1', 'Block 2'];
  selectedBlock = ['All Blocks'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#jsGrid').jsGrid({
      width: "100%",
      height: "400px",
     
      inserting: false,
      editing: false,
      sorting: true,
      paging: true,

      data: this.getDummyData(),
      
      fields: [
        { name: "id", type: "number", title: "ID", css:"text-align-c" },
        { name: "projectName", type: "text", title: "Project Name" },
        { name: "logo", type: "text", title: "logo" },
        { name: "companyName", type: "text", title: "Company Name" },
        { name: "tagline", type: "text", title: "Tagline" },
        { name: "url", type: "text", title: "Website" },
        {
          title: "Action", itemTemplate: function (value: any, item: any) {
              return "<div class='text-align-center'><button class='border-none' title='View Project Details' type='button' data-bs-target='#dv_viewProject' data-bs-toggle='modal' ><i class='fa fa-eye color-black' title='View Project'></i></button> <button class='border-none' title='' type='button' ><i class='fa fa-edit' title='Edit Project'></i></button> <button class='border-none' title='Delete Project' type='button' data-target='#' data-toggle='modal' ><i class='fa fa-trash' title='Delete Project'></i></button></div>";
          }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive"
        }
      ]
    });
   
  }

  getDummyData() {
    return [
      { id: 1, projectName: "Samrtpur Phase 1", logo: "abc.png", companyName: "USA" , tagline: "Smartpur Village", url:"https://defindia.org"},
      { id: 2, projectName: "Samrtpur Phase 2", logo: "abc.png", companyName: "Spain" , tagline: "Smartpur Village2", url:"https://defindia.org"},
      { id: 3, projectName: "Samrtpur Phase 3", logo: "abc.png", companyName: "India" , tagline: "Smartpur Village", url:"https://defindia.org"},
      { id: 4, projectName: "Samrtpur Phase 4", logo: "abc.png", companyName: "France" , tagline: "Smartpur Village", url:"https://defindia.org"},
      { id: 5, projectName: "Samrtpur Phase 2", logo: "abc.png", companyName: "UK" , tagline: "Smartpur Village", url:"https://defindia.org"},
    ];
  }

  toggleTab(){
    if(this.displayTab=='none') 
      {
        this.displayTab='block';
        
      }
    else 
      {
        this.displayTab='none';
        
      }
    if(this.displayTab1=='none') 
      {
        this.displayTab1='block';
        
      }
    else 
      {
        this.displayTab1='none';
        
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

  

}
