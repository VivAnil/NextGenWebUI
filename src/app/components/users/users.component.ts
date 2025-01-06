import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
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
  constructor() { }

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
