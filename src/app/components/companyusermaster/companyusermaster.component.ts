import { Component, OnInit } from '@angular/core';
declare var $: any; // Import jQuery
// import * as $ from 'jquery';
import 'jstree';
import { RolemasterService } from '../../services/rolemaster.service';
import { ICustomRoleDefinition } from '../../models/service.model';
@Component({
  selector: 'app-companyusermaster',
  templateUrl: './companyusermaster.component.html',
  styleUrls: ['./companyusermaster.component.css']
})
export class CompanyusermasterComponent implements OnInit {
  displayFilter: string = 'none';
  activeFilter: string = 'filter-link';
  isFilterOpen: boolean = false;
  displayColumn: string = 'none';
  activeColumn: string = 'column-link';
  activeDefault: string = 'default-link';
  activeTab: string = 'ui-tab ui-tabs-active ui-state-active';
  activeTab1: string = 'ui-tab ';
  isColumnOpen: boolean = false;
  displayTab1: string = 'none';
  displayTab: string = 'block';
  masterRoleData: any;
  companyPermissionData: any;
  customAssignedRoles: any;
  customRoleDisplayName: string = "";
  selectedSystemRole: any;
  selectedSystemRoleId: any;
  newCustomRolePermissions: string[] = [];
  disableDisplayName: boolean = false;
  constructor(private rolemasterService : RolemasterService) { }
  ngOnInit(): void {
    this.getCustomRoleDetails();
    this.initJsGrid();
  }

  ngAfterViewInit(): void {

    $('#html1').jstree({
      'core': {
        'data': [
          { "id": "companysection", "parent": "#", "text": "<b>COMPANY DETAILS</b>" },
          { "id": "companydetails", "parent": "companysection", "text": "Edit Company Details" },
          { "id": "Permission_1", "parent": "companydetails", "text": "Add" },
          { "id": "Permission_2", "parent": "companydetails", "text": "View" },
          { "id": "Permission_3", "parent": "companydetails", "text": "Edit" },
          { "id": "Permission_4", "parent": "companydetails", "text": "Delete" },
          { "id": "projectmaster", "parent": "companysection", "text": "Project Master" },
          { "id": "Permission_5", "parent": "projectmaster", "text": "Add" },
          { "id": "Permission_8", "parent": "projectmaster", "text": "View" },
          { "id": "Permission_7", "parent": "projectmaster", "text": "Edit" },
          { "id": "Permission_9", "parent": "projectmaster", "text": "Delete" },
          { "id": "reportsection", "parent": "#", "text": "<b>REPORT SECTION</b>" },
          { "id": "allreports", "parent": "reportsection", "text": "All Project Reports" },
          { "id": "Permission_10", "parent": "allreports", "text": "View" },
          { "id": "beneficiaryreports", "parent": "reportsection", "text": "All Beneficiaries Report" },
          { "id": "Permission_11", "parent": "beneficiaryreports", "text": "View" },
          { "id": "spwisereports", "parent": "reportsection", "text": "SP Wise Beneficiaries Report" },
          { "id": "Permission_12", "parent": "spwisereports", "text": "View" },
          { "id": "servicesection", "parent": "#", "text": "<b>SERVICE SECTION</b>" },
          { "id": "servicepillars", "parent": "servicesection", "text": "Service Pillars" },
          { "id": "Permission_13", "parent": "servicepillars", "text": "Add" },
          { "id": "Permission_15", "parent": "servicepillars", "text": "View" },
          { "id": "Permission_14", "parent": "servicepillars", "text": "Edit" },
          { "id": "Permission_16", "parent": "servicepillars", "text": "Delete" },
          { "id": "services", "parent": "servicesection", "text": "Servcies" },
          { "id": "Permission_17", "parent": "services", "text": "Add" },
          { "id": "Permission_19", "parent": "services", "text": "View" },
          { "id": "Permission_18", "parent": "services", "text": "Edit" },
          { "id": "Permission_20", "parent": "services", "text": "Delete" },
          { "id": "paymentsection", "parent": "#", "text": "<b>PAYMENT SECTION</b>" },
          { "id": "processpayment", "parent": "paymentsection", "text": "Process Payment" },
          { "id": "Permission_21", "parent": "processpayment", "text": "View" },
          { "id": "paymentreport", "parent": "paymentsection", "text": "Payment Report" },
          { "id": "Permission_22", "parent": "paymentreport", "text": "View" },
        ]
      },
      "checkbox": {
        "keep_selected_style": false
      },
      "plugins": ["checkbox"]
    });
    $('#html1').on("changed.jstree",  (e: any, data: { selected: any; deselected: any; }) => {
      this.newCustomRolePermissions = data.selected; // Get an array of selected node IDs
      console.log("Selected nodes:", this.newCustomRolePermissions);

      // You can also get the deselected nodes if needed
      var deselectedNodes = data.deselected;
      console.log("Deselected nodes:", deselectedNodes);

      // Implement your custom logic based on selected or deselected nodes
    });

  }
  openFilter() {
    this.isFilterOpen = !this.isFilterOpen;
    if (this.displayFilter == 'none') {
      this.displayFilter = 'block';
      this.activeFilter = 'filter-link filter-tab-btn';

    }
    else {
      this.displayFilter = 'none';
      this.activeFilter = 'filter-link';
    }
  }
  openColumn() {
    this.isColumnOpen = !this.isColumnOpen;

    if (this.displayColumn == 'none') {
      this.displayColumn = 'block';
      this.activeColumn = 'column-link filter-tab-btn';

    }
    else {
      this.displayColumn = 'none';
      this.activeColumn = 'column-link';
    }
  }

  openDefault() {

    if (this.activeDefault == 'default-link') {

      this.activeDefault = 'default-link default-tab-btn';

    }
    else {

      this.activeDefault = 'default-link';
    }

  }
  toggleTab() {
    if (this.displayTab == 'none') {
      this.displayTab = 'block';
      this.activeTab = 'ui-tab ui-tabs-active ui-state-active';
    }
    else {
      this.displayTab = 'none';
      this.activeTab = 'ui-tab';
    }
    if (this.displayTab1 == 'none') {
      this.displayTab1 = 'block';
      this.activeTab1 = 'ui-tab ui-tabs-active ui-state-active';
    }
    else {
      this.displayTab1 = 'none';
      this.activeTab1 = 'ui-tab';
    }
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
      pageButtonCount: 15,
      pagerFormat: "{prev}   {pageIndex}  of  {pageCount}   {next}",
      pagePrevText: "&larr;",
      pageNextText: "&#8594;",
      //pageFirstText: "First",
      // pageLastText: "Last",
      pageNavigatorNextText: "...",
      pageNavigatorPrevText: "...",
      autoload: true,
      data: JSON.stringify(this.customAssignedRoles),
      fields: [
        { title: "Profile Name", name: "profilename", type: "text", validate: "required", css: "width14em" },
        { title: "System User Type", name: "systemusertype", css: "width14em" },
        {
             title: "Action", itemTemplate: function (value: any, item: any) {
                 return "<div class='text-align-center'><button class='border-none' title='' type='button' data-bs-toggle='modal' data-bs-target='#dv_adduser'  ><i class='fa fa-edit' title='Edit User'></i></button> <button class='border-none' title='Delete User' type='button' data-bs-target='#' data-bs-toggle='modal' ><i class='fa fa-trash' title='Delete User'></i></button></div>";
             }, type: "text", sorting: false, editing: false, filtering: false, css: "inactive width14em text-align-center"
         }
      ]
    });
  }

  createRole() {
    if (this.customRoleDisplayName !== "" && this.selectedSystemRole !== null && this.newCustomRolePermissions.length > 0) {
      this.newCustomRolePermissions = this.newCustomRolePermissions.filter(permission => permission.startsWith("Permission_"))
      var permissions_assigned = this.newCustomRolePermissions.map(function (str) { return Number(str.replace("Permission_", "")) })
      const newCustomRole = {
        companyId: 1,
        companyRoleName: this.customRoleDisplayName,
        systemRoleId: this.selectedSystemRole[0].systemRoleId,
        systemRoleName: this.selectedSystemRole[0].systemRoleName,
        permisionsAssigned: permissions_assigned
      } as ICustomRoleDefinition;
      this.rolemasterService.createCustomRoleForCompany(newCustomRole).subscribe(customRoles => {
        console.log(customRoles);
        if (Number(customRoles) > 0) {
          this.customRoleDisplayName = "";
          var newRole = this.masterRoleData.filter((role: { systemRoleId: number; systemRoleName: string; customRoleExists: boolean; }) => role.systemRoleId === this.selectedSystemRole[0].systemRoleId);// This will give you the raw value
          newRole.customRoleExists = true;
          $("#MappedGrid").jsGrid("insertItem", { profilename: this.customRoleDisplayName, systemusertype: this.selectedSystemRole[0].systemRoleName }).done(function () { console.log("insertion completed"); });
        } 
      });
    }
  }
  
  onSelect(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = Number( selectElement.value); 
    this.selectedSystemRole = this.masterRoleData.filter((role: { systemRoleId: number; systemRoleName: string; customRoleExists: boolean; }) => role.systemRoleId === selectedValue);// This will give you the raw value
    this.disableDisplayName = this.selectedSystemRole[0].customRoleExists;
  }

  getCustomRoleDetails() {
    this.rolemasterService.getCustomRoleForCompany(1).subscribe(customRoles => {
      this.customAssignedRoles = customRoles.filter(item => item.companyRoleName !== null).
        map(item => ({
          profilename: item.companyRoleName,
          systemusertype: item.systemRoleName
        }));

      this.masterRoleData = customRoles.filter(item => item.systemRoleName !== null)
        .map(item => ({
          systemRoleId: item.systemRoleId,
          systemRoleName: item.systemRoleName,
          customRoleExists: item.companyRoleName !== null
        }));

      $("#MappedGrid").jsGrid("option", "data", this.customAssignedRoles);
    });
  }

  getPermissionDetails() {
    this.rolemasterService.getSystemPermissions().subscribe(systemPermissions => {
      let permissionData: Array<IPermissionGroup> = [];

      var distinct = systemPermissions.map(item => item.ParentId)
        .filter((value, index, self) => self.indexOf(value) === index)

      let grouped = systemPermissions.reduce(
        (result: any, currentValue: any) => {
          (result[currentValue['ParentId']] = result[currentValue['ParentId']] || []).push(currentValue);
          return result;
        }, {});
      for (let i in distinct) {
        let group = grouped[distinct[i]];
        console.log(group);
        if (distinct[i] === 0) {
          for (let grp of group) {
            let permission = <IPermissionGroup>{};
            permission.PermissionId = grp.Id;
            permission.DisplayName = grp.DisplayName;
            permission.Children = [];
            permissionData.push(permission);
          }
        }
        else {

          let parent = permissionData.find(p => p.PermissionId === group[0].ParentId);
          if (parent === undefined) {
            var childen = permissionData[0].Children;
            parent = childen.find(p => p.PermissionId === group[0].ParentId)
          }
          for (let grp of group) {
            let permission = <IPermissionGroup>{};
            permission.PermissionId = grp.Id;
            permission.DisplayName = grp.DisplayName
            permission.Children = [];
            parent?.Children.push(permission);
          }
        }
      }

      this.companyPermissionData = permissionData;

    });
  }

  getMasterRoleData() {
    this.rolemasterService.getSystemRoles().subscribe(systemRoles => {
      let roleData: Array<any> = [];
      for (let systemRole of systemRoles) {
        roleData.push(
          {
            "profilename": systemRole.DisplayName,
            "systemusertype": systemRole.Id
          }
        );
      }
      this.masterRoleData =  roleData;
    });
  }
}

export interface IPermissionGroup {
  PermissionId: number,
  DisplayName: string,
  Children: IPermissionGroup[];
};



