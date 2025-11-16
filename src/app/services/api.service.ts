import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'jquery';
import { ServicePillar } from '../models/servicePillar.model';
import { userDetails } from '../models/userDetails.model';
import { Beneficiary } from '../models/beneficiary.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 // private baseUrl : string = 'https://localhost:7052/api/Service/Get';//environment.baseServiceurl;
 private baseUrl : string = environment.baseServiceUrl;
  private baseSPurl: string = environment.baseSPUrl;
  private tgtbaseUrl = 'https://motherappuserapi.azurewebsites.net/api/TGTDashBoard';
 private userdetailsApiUrl: string = environment.userdetailsApiUrl;
 private companyId!:string;
  constructor(private http: HttpClient) { }
  private services: Service[] = [];
  private userDetails: userDetails[] = [];

  getData(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(this.getFallbackData());
      })
    );
  }

  getSerPillarData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseSPurl).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of();
      })
    );
  }
  private getFallbackData(): any[] {
    return [
      {
        id: 1,
        servicePillarName: 'Digital Services',
        name: 'Photocopy',
        serviceRate: 10,
        serviceWorth: 10,
        status: true,
        singleTimeAvailability: false,
        spOnly: true,
        advanceFields: '',
        servicePillar: ''
       },
      //  {
      //   Id: 2,
      //   ServicePillarId: 2,
      //   Name: 'Printout',
      //   ServiceRate: 5,
      //   ServiceWorth: 5,
      //   Status: true,
      //   SingleTimeAvailability: false,
      //   SpOnly: true,
      //   AdvanceFields: '',
      //   ServicePillar: ''
      //  }
    ];
  }

  getuserDetails(url:string): Observable<userDetails[]> {

    return this.http.get<userDetails[]>(url).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of (error);
      })
    );
  }
   
  fetchUserDetails(url:string, dataKey:string): Observable<userDetails[]> {

    return this.http.get<userDetails[]>(url).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of (error);
      })
    );
  }

  fetchBeneficiaries(url:string, dataKey:string): Observable<Beneficiary[]> {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    this.companyId = userRoleSettings.companyId;

    //const benUrl='https://motherappuserapi.azurewebsites.net/api/Beneficiary/GetAllBeneficiaries/'+ this.companyId +'/0/0';
    // Extract numeric parameters from the passed URL
    // e.g. "https://motherappuserapi.azurewebsites.net/user/32/0/67"
    const parts = url.split('/').filter(p => p.trim() !== '');
    const len = parts.length;

    // Get the last 3 segments if they exist: companyId, projectId, blockId
    const companyId = parts[len - 3] || this.companyId;
    const projectId = parts[len - 2] || '0';
    const spId = parts[len - 1] || '0';

    // ✅ Dynamically construct API URL
    const benUrl = `https://motherappuserapi.azurewebsites.net/api/Beneficiary/GetAllBeneficiaries/${companyId}/${projectId}/${spId}`;

    console.log('Fetching beneficiaries from:', benUrl);

    return this.http.get<Beneficiary[]>(benUrl).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        console.log("Exception in calling service. Endpoint " + benUrl);
        return of (error);
      })
    );
  }

  
  saveBeneficiary(data: any): Observable<any> {
    const benUrl='https://motherappuserapi.azurewebsites.net/api/Beneficiary';
    const api = benUrl;
    return this.http.post<any>(api, data);
  }

  fetchTGTDashBoardFilters(): Observable<any> {
    const filterUrl = this.tgtbaseUrl+ '/GetFilters';
    //const filterUrl = 'https://localhost:7122/api/TGTDashBoard/GetFilters';
    return this.http.get<any>(filterUrl);
  }

  fetchTGTDashBoarData(rwes: any): Observable<any> {
    const filterUrl = this.tgtbaseUrl+ '/GetRWESummary';
    //const filterUrl = 'https://localhost:7122/api/TGTDashBoard/GetRWESummary';
    return this.http.post<any>(filterUrl, rwes);
  }

  createTGTBusinessType(model: TGTBusinessType): Observable<boolean> {
    return this.http.post<boolean>(`${this.tgtbaseUrl}/CreateRWEBusinessType`, model);
  }

  updateTGTBusinessType(model: TGTBusinessType): Observable<boolean> {
    return this.http.put<boolean>(`${this.tgtbaseUrl}/UpdateRWEBusinessType`, model);
  }

  deleteTGTBusinessType(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.tgtbaseUrl}/DeleteRWEBusinessType/${id}`);
  }

  createTGTBusinessSubCatType(model: TGTBusinessSubCatType): Observable<boolean> {
    return this.http.post<boolean>(`${this.tgtbaseUrl}/CreateRWEBusinessSubCatType`, model);
  }

  updateTGTBusinessSubCatType(model: TGTBusinessSubCatType): Observable<boolean> {
    return this.http.put<boolean>(`${this.tgtbaseUrl}/UpdateRWEBusinessSubCatType`, model);
  }

  deleteTGTBusinessSubCatType(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.tgtbaseUrl}/DeleteRWEBusinessSubCatType/${id}`);
  }

  createTGTServiceOrProduct(model: TGTServiceOrProduct): Observable<boolean> {
    return this.http.post<boolean>(`${this.tgtbaseUrl}/CreateRWEServiceOrProduct`, model);
  }

  updateTGTServiceOrProduct(model: TGTServiceOrProduct): Observable<boolean> {
    return this.http.put<boolean>(`${this.tgtbaseUrl}/UpdateRWEServiceOrProduct`, model);
  }

  deleteTGTServiceOrProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.tgtbaseUrl}/DeleteRWEServiceOrProduct/${id}`);
  }
  getLbcByClmId(clmId: number) {
    const userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    let permissionSettings = userRoleSettings ? userRoleSettings.permissionSettings : [];
    this.companyId = userRoleSettings.companyId;

    const userUrl = 'https://motherappuserapi.azurewebsites.net/User/byManager/' + this.companyId + '/' + clmId;
    return this.http.get<any[]>(userUrl);
  }


}

export interface TGTBusinessType {
  id: number;
  name: string;
  desc?: string;
  enabled: boolean;
}

export interface TGTBusinessSubCatType {
  id: number;
  businessTypeId: number;
  name: string;
  desc?: string;
  enabled: boolean;
}

export interface TGTServiceOrProduct {
  id: number;
  name: string;
  businessSubCatId: number;
  enabled: boolean;
  unit: string;
  margin: number;
  sellingPrice: number;
}
