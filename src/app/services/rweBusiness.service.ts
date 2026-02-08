import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { RWEBusinessFilters } from './rwe-business-filters.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class rweBusiness {
  private apibaseUrl = 'https://motherappuserapi.azurewebsites.net/api/Beneficiary/';

  constructor(private http: HttpClient) { }

  getRWEBusinessFilters(): Observable<any> {
    return this.http.get<RWEBusinessFilters>(this.apibaseUrl + "RWEBusinessFilters");
    // return this.http.get<RWEBusinessFilters>(this.apiUrl + '/GetRWEBusinessFilters');
  }

  saveRweBusiness(rweBusiness: RweBusiness): Observable<any> {
    return this.http.post(this.apibaseUrl +"SaveRweBusiness", rweBusiness);
  }

  getAllBusinessesForRwe(rweId: number): Observable<RweBusiness[]> {
    return this.http.get<RweBusiness[]>(`${this.apibaseUrl}GetAllBusinessesForRWE`, {
      params: { rweId: rweId.toString() }
    });
  }

  addProduct(payload: any): Observable<any> {
    return this.http.post('https://motherappuserapi.azurewebsites.net/api/TGTDashBoard/CreateRWEServiceOrProduct', payload);
  }
  AddBusinessSubCatType(payload: any) {
    return this.http.post(
      'https://motherappuserapi.azurewebsites.net/api/TGTDashBoard/CreateRWEBusinessSubCatType',
      payload
    );
  }
  addBusinessType(data: any) {
    return this.http.post(
      'https://motherappuserapi.azurewebsites.net/api/TGTDashBoard/CreateRWEBusinessType',
      data
    );
  }


}

export interface RWEBusinessFilters {
  rweBusinessType: RweBusinessType[];
  rweBusinessSubCatType: RweBusinessSubCatType[];
  rweServiceOrProduct: RweBusinessProduct[];
}

export interface RweBusinessSubCatType {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  businessTypeId: number;
  // add any additional fields if present
}

export interface RweBusinessType {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
}
export interface BusinessType {
  id: number;
  name: string;

}
export interface BusinessTypeApiResponse {
  businessTypeId: number;
  businessTypeName: string;
}
export interface ServiceOrProductApiResponse {
  businessTypeId: number;
  businessType: string;
  serviceOrProductId: number;
  serviceOrProductName: string;
  businessSubCatId: number;
  subCatName: string;
  sellingPrice: number;
  unit: string;
  margin: number;
}
export interface BusinessSubCategory {
  id: number;
  name: string;
}
export interface ServiceOrProduct {
  businessTypeId: number;
  businessType: string;
  serviceOrProductId: number;
  serviceOrProductName: string;
  businessSubCatId: number;
  sellingPrice: number;
  unit: string;
  margin: number;
  subCatName: string;
}
export interface BusinessProduct {
  businessTypeId: number;
  businessType: string;
  serviceOrProductId: number;
  serviceOrProductName: string;
  businessSubCatId: number;
  subCatName: string;
  sellingPrice: number;
  unit: string;
  margin: number;
}
export interface DropdownOption {
  id: number;
  name: string;
}

export interface RweBusinessProduct {
  id: number;
  name: string;
  enabled: boolean;
  businessTypeId: number;
  businessCategoty: string;     // (typo kept as provided—can fix if needed)
  businessSubCatId: number;
  businessSubCategoty: string;  // (typo kept as provided)
  margin: number;
  sellingPrice: number;
  unit: string;
}
export interface RweBusiness {
  id: number;
  rweId: number;
  businessTypeId: number;
  businessSubCatTypeId: number;
  serviceOrProductId: number;
  inventory: number;
  inventoryUnit: string;
  startMonth: number;
  startYear: number;
  totalInvestment: number;
  selfInvestment: number;
  projectLoan: number | null;
  bankLoan: number | null;
  collectiveLoan: number | null;
  businessName: string;
}
