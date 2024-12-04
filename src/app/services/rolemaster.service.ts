import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { SystemPermission, SystemRole } from '../models/service.model';

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

  getSystemPermissions(): Observable<SystemPermission[]> {
    return this.http.get<SystemPermission[]>(this.baseUrl + "/systempermission/get").pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(this.getDefaultPermissions());
      })
    );
  }

  private getDefaultPermissions(): any[] {
    return [
      {
        Id: 1,
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
      }];
  }
}
