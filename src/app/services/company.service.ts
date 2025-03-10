import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CompanyDashboard {
  companyId: number;
  companyName: string;
  companyEmail: string;
  companyPhone:string;
  logo: string; // Base64 string
  projects: number;
  projectManagers: number;
  districtCoordinator: number;
  blockCoordinator: number;
  soochnapreneur: number;
  states: number;
  services: number;
}

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
 
  // private companyDashboardApiUrl = 'https://motherappcompanyapi.azurewebsites.net/api/Company/GetCompanyDashboard';
  // private benStatsApiUrl = 'https://motherappcompanyapi.azurewebsites.net/api/Project/GetBeneficiaryStats';

  private companyDashboardApiUrl : string = environment.companyDashboardApiUrl;
  private benStatsApiUrl : string = environment.benStatsApiUrl;
  private baseCompanyUrl: string = environment.baseCompanyUrl;
  constructor(private http: HttpClient) { }

  getCompanyStatistics(): Observable<CompanyDashboard[]> {
    return this.http.get<CompanyDashboard[]>(this.companyDashboardApiUrl);
  }

  getBeneficiaryStats(companyId: number): Observable<any> {
    return this.http.get(`${this.benStatsApiUrl}/${companyId}`);
  }

  addCompany(data: any): Observable<any> {
    const api = this.baseCompanyUrl + 'company';
    return this.http.post<any>(api, data);
  }
}
