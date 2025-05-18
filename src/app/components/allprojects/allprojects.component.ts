import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ProjectsService } from '../../services/projects.service';
declare var $: any; // Import jQuery
@Component({
  selector: 'app-allprojects',
  templateUrl: './allprojects.component.html',
  styleUrls: ['./allprojects.component.css']
})
export class AllprojectsComponent implements OnInit {
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
  userRoleSettings: any = null;
  projectServiceData: any;
  projectsList: any;
  selectedProjectId: any = 0;
  startDate: any;
  endDate: any;

  constructor(private projectsService: ProjectsService) {
    const userString = localStorage.getItem('userRoleSettings');
    this.userRoleSettings = userString ? JSON.parse(userString) : null;
    this.endDate = new Date();
    var oldDate = new Date();
    oldDate.setDate(this.endDate.getDate() - 300);
    this.startDate = oldDate; 
 }
  ngAfterViewInit(): void {
    this.initJsGrid();
  }
  initJsGrid() {
    $('#allProjectGrid').jsGrid({
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
      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",
      //pageFirstText: "First",
      // pageLastText: "Last",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",

      data: JSON.stringify(this.projectServiceData),
       autoload: true,

      //controller: {
      //  loadData: () => {
      //    return this.projectsService.getAllProjectsForUser().toPromise();
      //  },
      //},
      fields: [
        { title: "Project Id", name: "projectId", type: "number", validate: "required", css: "text-align-c" },
        { title: "Project Name", name: "projectName", type: "text", css: "width14em" },
        { title: "Total Unique Beneficiaries", name: "uniqueBenfCount", type: "number", css: "text-align-c" },
        { title: "Total No. Of SPs", name: "uniqueSPCount", type: "number", css: "text-align-c width6em" },
        { title: "Total No. Of Services", name: "totalServices", type: "number", css: "text-align-c width6em" },
        { title: "Revenue By Services (A)", name: "totalServiceRate", type: "number", css: "text-align-c width6em" },
        { title: "Revenue By Incentives (B)", name: "totalIncentivesPayable", type: "number", css: "text-align-c width6em" },
        { title: "Total Services Worth", name: "totalServiceWorth", type: "number", validate: "required", css: "text-align-c" },
        {
          title: "Action", name :"action", itemTemplate:"<div class='text-align-center'><a class='border-none color-black margin-right-10px' title='View Project Analytics' type='button' href='projectanalytics.html' ><i class='fa fa-area-chart'></i></a> <a class='border-none color-black' title='View Project Details' type='button' href='viewprojectdetails.html' ><i class='fa fa-eye' title='View Project Details'></i></a></div>", type: "text", sorting: false, editing: false, filtering: false, css: "inactive"
        }
      ]
    });
   
  }

  ngOnInit(): void {
    this.projectsService.getProjectWiseRevenue('2025-01-01', '2025-10-01', undefined).subscribe(revenueData => {
      this.projectServiceData = revenueData;
      $("#allProjectGrid").jsGrid("option", "data", this.projectServiceData.projectWiseRevenueSummary);
    });

    this.projectsService.getAllProjectsForCompany().subscribe(projectsData => {
      this.projectsList = projectsData.map((project: { id: number; name: string; }) => ({
        id: project.id,
        name: project.name
      }));
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

  filterByDate(event: any) {
    this.projectsService.getProjectWiseRevenue(this.startDate, this.endDate, this.selectedProjectId).subscribe(revenueData => {
      this.projectServiceData = revenueData;
      $("#allProjectGrid").jsGrid("option", "data", this.projectServiceData.projectWiseRevenueSummary);
    });
  }

  onProjectSelect(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedProjectId = Number(selectElement.value) === 0 ? null : Number(selectElement.value);

    console.log(Array.isArray(this.projectServiceData));

    let filterdata = 
      Number(selectElement.value) === 0
        ? this.projectServiceData.projectWiseRevenueSummary
        : this.projectServiceData.projectWiseRevenueSummary.filter((project: any) => Number(project.projectId) === this.selectedProjectId)
      ;
    $("#allProjectGrid").jsGrid("option", "data", filterdata);
  }
}
