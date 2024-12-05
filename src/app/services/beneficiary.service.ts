import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Beneficiary } from '../models/beneficiary.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  private baseUrl : string = environment.baseBeneficiaryUrl;
  
  constructor(private http: HttpClient) { }
  private beneficiaries: Beneficiary[] = [];

  getData(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(this.baseUrl).pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(this.getFallbackData());
      })
    );
  }
  getFallbackData(): any []{
    return [
      {
    "id": 1,
    "firstName": "string",
    "lastName": "string",
    "fathersName": "string",
    "husbandsName": "string",
    "dob": "string",
    "idProof": 1,
    "idDetails": "string",
    "state": 1,
    "district": 1,
    "sex": 1,
    "age": 0,
    "religion": 1,
    "socio": 0,
    "occupation": 0,
    "maritulStatus": 0,
    "category": 0,
    "department": 0,
    "empStatus": 0,
    "vulGroup": 0,
    "annualIncome": 0,
    "disablity": 0,
    "soochnaPreneur": {
      "id": 7,
      "firstName": "Raman",
      "lastName": "Karthik"
    },
    "relationship": 0,
    "sickness": "string",
    "percentageDisability": "string",
    "address": "string",
    "eMail": "string",
    "phone": "string",
    "qualification": 0,
    "dateOfRegistration": 0,
    "blockId": 2,
    "villageId": 1,
    "panchayatId": 1
      }
    ];
  }
}
