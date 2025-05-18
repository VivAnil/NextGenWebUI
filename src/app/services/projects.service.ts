import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private baseUrl: string = environment.baseProjectSpWiseRevenueApiUrl;
    userRoleSettings: any;
  constructor(private http: HttpClient) {
    const userString = localStorage.getItem('userRoleSettings');
    this.userRoleSettings = userString ? JSON.parse(userString) : null;
  }

  getProjectWiseRevenue(startDate: string, endDate: string, projectid?: number): Observable<any> {
   

    let request = {
      "companyId" : this.userRoleSettings.companyId,
      "managerId" : this.userRoleSettings.systemRoleId == 1 ? null : this.userRoleSettings.Id,
      "projectid" : this.userRoleSettings.systemRoleId == 1 ? null : this.userRoleSettings.ProjectId,
      "startDate" : '2025-01-01',
      "endDate" : '2025-10-01'
    };

    return this.http.post<any>(this.baseUrl + "ServicesReport/GetProjectWiseRevenue",request).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of([]);
      })
    );
  }

  getAllProjectsForCompany(): Observable<any> {
    return this.http.get<any>(this.baseUrl + "Project/GetAllProjects").pipe(
      map((projects: any[]) =>
        projects.filter(project => project.companyId === this.userRoleSettings.companyId)
      ),
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of([]);
      })
    );
  }
}

export interface ProjectDetail {
  id: number
  companyId: number
  name: string
  tagLine: any
  logo: any
  url: any
}


