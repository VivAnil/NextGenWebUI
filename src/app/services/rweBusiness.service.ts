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

  getRWEBusinessFilters(): Observable<RWEBusinessFilters> {
    return this.http.get<RWEBusinessFilters>(this.apibaseUrl +"RWEBusinessFilters");
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
  rweBusinessType: { [key: number]: string };
  rweBusinessSubCatType: { [key: number]: string };
  rweServiceOrProduct: { [key: number]: string };
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
