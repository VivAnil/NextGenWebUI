
import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as $ from 'jquery';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor() { }
  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#jsGrid').jsGrid({
      width: "100%",
      height: "400px",
     
      inserting: true,
      editing: true,
      sorting: true,
      paging: true,

      data: this.getDummyData(),
      
      fields: [
        { name: "id", type: "number", width: 5, title: "ID" },
        { name: "projectName", type: "text", width: 150, title: "Project Name" },
        { name: "logo", type: "text", width: 50, title: "logo" },
        { name: "companyName", type: "text", width: 50, title: "companyName" },
        { name: "tagline", type: "text", width: 100, title: "tagline" },
        { name: "url", type: "text", width: 100, title: "url" },
        { type: "control" }
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

 
  ngOnInit(): void {
  }

}
