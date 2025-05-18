import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { ICustomRoleDefinition, SystemPermission, SystemRole } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class RolemasterService {
  private baseUrl: string = environment.baseRoleMasterApiUrl;
  userRoleSettings: any = null;
  customRoleSettings: any = null;
  constructor(private http: HttpClient) {
    const userString = localStorage.getItem('userRoleSettings');
    this.userRoleSettings = userString ? JSON.parse(userString) : null;
  }

  getSystemRoles(): Observable<SystemRole[]> {
    return this.http.get<SystemRole[]>(this.baseUrl+"/systemrole/get").pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(this.getDefaultRoles());
      })
    );
  }

  private getDefaultRoles(): any[] {
    return [
      {
        Id: 1,
        DisplayName: "Administrator"
      },
      {
        Id: 2,
        DisplayName: "Project Incharge"
      },
      {
        Id: 3,
        DisplayName: "State Coordinator"
      }
    ];
  }

  getCustomRoleDefinitionForCompany(companyRoleId: number): Observable<any> {
    if (this.customRoleSettings?.companyRoleId !== companyRoleId) {
    // return this.http.get<any>("https://localhost:7047/api/CompanyUserRoleMaster/CompanyRoleSettings/"+companyRoleId).pipe(
      return this.http.get<any>(environment.companyUserRoleMasterBaseUrl + `/CompanyRoleSettings/${companyRoleId}`).pipe(
        catchError((error) => {
          console.error('API call failed:', error);
          // Return hardcoded fallback data
          console.log("Exception in calling service. Endpoint " + this.baseUrl);
          return of(error);
        })
      );
    }
    return of(this.customRoleSettings);
  }

  getCustomRoleForCompany(): Observable<any[]> {
    console.log(this.userRoleSettings.companyRoleId);
    return this.http.get<any>(environment.companyUserRoleMasterBaseUrl + "/CompanyRoles/"+this.userRoleSettings.companyId).pipe(
   //return this.http.get<any>("https://localhost:7047/api/CompanyUserRoleMaster/CompanyRoles/1").pipe(
      catchError(error => {
        console.error('Get custom company role failed');
        return of(error);  // Return false on error
      })
    );

  }

  deleteCustomRoleForCompany(companyRoleId: number): Observable<any[]> {
    var customRole: any = {
      CompanyRoleId: companyRoleId
    };
    return this.http.delete<any>(environment.companyUserRoleMasterBaseUrl + "/delete" , customRole).pipe(
    //return this.http.delete<any>("https://localhost:7047/api/CompanyUserRoleMaster/delete", customRole).pipe(
      catchError(error => {
        console.error('Get custom company role failed');
        return of(error);  // Return false on error
      })
    );

  }

  createCustomRoleForCompany(customRoleDefinition: ICustomRoleDefinition) {

    var customRole :any = {
      SystemRoleId: customRoleDefinition.systemRoleId,
      CustomRoleName: customRoleDefinition.companyRoleName,
      CompanyId: customRoleDefinition.companyId,
      PermissionsAssigned:customRoleDefinition.permisionsAssigned
    };
    return this.http.post<any>(environment.companyUserRoleMasterBaseUrl + "/create", customRole).pipe(
    //return this.http.post<any>("https://localhost:7047/api/CompanyUserRoleMaster/create", customRole).pipe(
      map((response: { id: number; }) => {
        console.log(response);
        return (response.id);
      }),
      catchError(error => {
        console.error('Create custom role failed');
        return of(-1);  // Return false on error
      })
    );
  }
  updateCustomRoleForCompany(customRoleDefinition: ICustomRoleDefinition) {

    var customRole: any = {
      CompanyRoleId: customRoleDefinition.companyRoleId,
      SystemRoleId: customRoleDefinition.systemRoleId,
      CustomRoleName: customRoleDefinition.companyRoleName,
      CompanyId: customRoleDefinition.companyId,
      PermissionsUpdated : customRoleDefinition.permisionsAssigned
    };
    return this.http.put<any>(environment.companyUserRoleMasterBaseUrl + "/update", customRole).pipe(
    //  return this.http.put<any>("https://localhost:7047/api/CompanyUserRoleMaster/update", customRole).pipe(
      map((response: { id: number; }) => {
        console.log(response);
        return (response.id);
      }),
      catchError(error => {
        console.error('Create custom role failed');
        return of(-1);  // Return false on error
      })
    );
  }
  private getDefaultPermissions(): any[] {
    return [
      {
        Id: 1,
        ParentId:0,
        DisplayName:"Company Details"
      },
      {
        Id: 2,
        ParentId:1,
        DisplayName: "Edit Company Details"
      },
      {
        Id: 3,
        ParentId: 2,
        DisplayName: "View"
      },
      {
        Id: 4,
        ParentId: 2,
        DisplayName: "Add"
      },
      {
        Id: 5,
        ParentId: 2,
        DisplayName: "Edit"
      },
      {
        Id: 6,
        ParentId: 2,
        DisplayName: "Delete"
      },
      {
        Id: 7,
        ParentId: 1,
        DisplayName: "Project Master"
      },
      {
        Id: 8,
        ParentId: 7,
        DisplayName: "View"
      },
      {
        Id: 9,
        ParentId: 7,
        DisplayName: "Add"
      }];
  }
}
