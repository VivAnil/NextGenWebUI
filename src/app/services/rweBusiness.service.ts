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
    return this.http.get<any>(this.apibaseUrl +"RWEBusinessFilters");
  }

  saveRweBusiness(rweBusiness: RweBusiness): Observable<any> {
    return this.http.post(this.apibaseUrl +"SaveRweBusiness", rweBusiness);
  }

  getAllBusinessesForRwe(rweId: number): Observable<RweBusiness[]> {
    return this.http.get<RweBusiness[]>(`${this.apibaseUrl}GetAllBusinessesForRWE`, {
      params: { rweId: rweId.toString() }
    });
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
  projectLoan: number;
  bankLoan: number;
  collectiveLoan: number;
}
