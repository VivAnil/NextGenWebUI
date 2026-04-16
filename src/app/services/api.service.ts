import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServicePillar } from '../models/servicePillar.model';
import { userDetails } from '../models/userDetails.model';
import { Beneficiary } from '../models/beneficiary.model';
import { BusinessSubCategory, BusinessType, BusinessTypeApiResponse, RweBusinessType, ServiceOrProduct, ServiceOrProductApiResponse } from './rweBusiness.service';
import { tgtBusiness } from '../models/rwe-business.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

 // private baseUrl : string = 'https://localhost:7052/api/Service/Get';//environment.baseServiceurl;
 private baseUrl : string = environment.baseServiceUrl;
  private baseSPurl: string = environment.baseSPUrl;
  private tgtbaseUrl = 'https://motherappuserapi.defindia.org/api/TGTDashBoard';
 private userdetailsApiUrl: string = environment.userdetailsApiUrl;
 private companyId!:string;
  constructor(private http: HttpClient) { }
  private services: Service[] = [];
  private userDetails: userDetails[] = [];

  getData(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl +"/Get").pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(this.getFallbackData());
      })
    );
  }

  getSerPillarData(): Observable<any[]> {
    return this.http.get<any[]>(this.baseSPurl+"/Get").pipe(
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
  getBusinessTypesByUserId(companyId: number, userId: number, userType: string) {
    const url = `https://motherappuserapi.defindia.org/api/TGTDashBoard/GetBusinessType?companyId=${companyId}&userId=${userId}&userType=${userType}`;

    return this.http
      .get<BusinessTypeApiResponse[]>(url)
      .pipe(
        map(res =>
          res.map(bt => ({
            id: bt.businessTypeId,
            name: bt.businessTypeName
          }))
        )
      );
  }
  getBusinessTypes(companyId: number, companyRoleId: number) {
    const url = `https://motherappuserapi.defindia.org/api/TGTDashBoard/GetBusinessType?companyId=${companyId}&companyRoleId=${companyRoleId}`;

    return this.http
      .get<BusinessTypeApiResponse[]>(url)
      .pipe(
        map(res =>
          res.map(bt => ({
            id: bt.businessTypeId,
            name: bt.businessTypeName
          }))
        )
      );
  }
getServiceOrProductByBusinessType(
  businessTypeId: number
) {
  const url = `https://motherappuserapi.defindia.org/api/TGTDashBoard/GetServiceOrProductByBusinessType/${businessTypeId}`;

  return this.http.get<ServiceOrProduct[]>(url);
}
  getBusinessesByRweId(rweId: number) {
    const url = `https://motherappuserapi.defindia.org/api/TGTDashBoard/GetBusinessNameById/${rweId}/lbc`;

    return this.http.get<tgtBusiness[]>(url);
  }

  // getServiceOrProductByBusinessType(businessTypeId: number) {
  //   const url = `https://motherappuserapi.defindia.org/api/TGTDashBoard/GetServiceOrProductByBusinessType/${businessTypeId}`;

  //   return this.http
  //     .get<ServiceOrProductApiResponse[]>(url)
  //     .pipe(
  //       map(res => {
  //         //Deduplicate by businessSubCatId
  //         const uniqueMap = new Map<number, BusinessSubCategory>();
          
  //         res.forEach(item => {
  //           if (!uniqueMap.has(item.businessSubCatId)) {
  //             uniqueMap.set(item.businessSubCatId, {
  //               id: item.businessSubCatId,
  //               name: item.subCatName
  //             });
  //           }
  //         });

  //         return Array.from(uniqueMap.values());
  //       })
  //     );
  // }

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

    //const benUrl='https://motherappuserapi.defindia.org/api/Beneficiary/GetAllBeneficiaries/'+ this.companyId +'/0/0';
    // Extract numeric parameters from the passed URL
    // e.g. "https://motherappuserapi.defindia.org/user/32/0/67"
    const parts = url.split('/').filter(p => p.trim() !== '');
    const len = parts.length;

    // Get the last 3 segments if they exist: companyId, projectId, blockId
    const companyId = parts[len - 3] || this.companyId;
    const projectId = parts[len - 2] || '0';
    const spId = parts[len - 1] || '0';

    // ✅ Dynamically construct API URL
    const benUrl = `https://motherappuserapi.defindia.org/api/Beneficiary/GetAllBeneficiaries/${companyId}/${projectId}/${spId}`;

    console.log('Fetching beneficiaries from:', benUrl);

    return this.http.get<Beneficiary[]>(benUrl).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        console.log("Exception in calling service. Endpoint " + benUrl);
        return of (error);
      })
    );
  }

  saveService(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }
  
  saveBeneficiary(data: any): Observable<any> {
    const benUrl = 'https://motherappuserapi.defindia.org/api/Beneficiary';
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

    const userUrl = 'https://motherappuserapi.defindia.org/User/byManager/' + this.companyId + '/' + clmId;
    return this.http.get<any[]>(userUrl);
  }
  // getLBCReport(fromDate?: string, toDate?: string, spId?: number): Observable<any[]> {
  //   let params = new HttpParams()
  //     .set('fromDate', fromDate == null ? '' : fromDate)
  //     .set('toDate', toDate == null ? '' : toDate);
  //   const baseLBCUrl = 'https://motherappuserapi.defindia.org/api/Beneficiary';
  //   const url = `${baseLBCUrl}/GetLBCReport?fromDate=${fromDate}&toDate=${toDate}&soochnapreneurId=${spId}`;
  //   return this.http.get<any[]>(url);
  // }

  getLBCReport(fromDate?: string, toDate?: string, spId?: number): Observable<any[]> {
    let params = new HttpParams()
      .set('fromDate', fromDate == null ? '' : fromDate)
      .set('toDate', toDate == null ? '' : toDate);

    if (spId && spId > 0) {
      params = params.set('spId', spId);
    }

    return this.http.get<any[]>('https://motherappuserapi.defindia.org/api/Beneficiary/GetLBCReport', { params });
  }

  getProductReport(fromDate?: string, toDate?: string, spId?: number): Observable<any[]> {
    let params = new HttpParams()
      .set('fromDate', fromDate == null ? '' : fromDate)
      .set('toDate', toDate == null ? '' : toDate);

    if (spId && spId > 0) {
      params = params.set('spId', spId);
    }
    return this.http.get<any[]>('https://motherappuserapi.defindia.org/api/Beneficiary/GetProductReport', { params });
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
