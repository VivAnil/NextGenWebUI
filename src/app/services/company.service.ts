import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
  private apiUrl = 'https://motherappcompanyapi.azurewebsites.net/api/Company/GetCompanyDashboard';
  constructor(private http: HttpClient) { }

  getCompanyStatistics(): Observable<CompanyDashboard[]> {
    return this.http.get<CompanyDashboard[]>(this.apiUrl);
  }
}
