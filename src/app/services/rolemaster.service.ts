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
  constructor(private http: HttpClient) { }

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
    return this.http.get<any>(environment.companyUserRoleMasterBaseUrl + `/CompanyRoleSettings/${companyRoleId}`).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(error);
      })
    );
  }

  getCustomRoleForCompany( companyId:number): Observable<any[]> {
    return this.http.get<any>(environment.companyUserRoleMasterBaseUrl+ "/CompanyRoles/1").pipe(
    //return this.http.post<any>("https://localhost:7047/api/CompanyUserRoleMaster/CompanyRoles/1").pipe(
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
    return this.http.post<any>(environment.companyUserRoleMasterBaseUrl + "/update", customRole).pipe(
      //return this.http.put<any>("https://localhost:7047/api/CompanyUserRoleMaster/update", customRole).pipe(
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
