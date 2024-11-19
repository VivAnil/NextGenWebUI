import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'jquery';
import { ServicePillar } from '../models/servicePillar.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 // private baseUrl : string = 'https://localhost:7052/api/Service/Get';//environment.baseServiceurl;
 private baseUrl : string = environment.baseServiceUrl;
 private baseSPurl: string = environment.baseSPUrl;
  constructor(private http: HttpClient) { }
  private services: Service[] = [
  
  ];
   
  // getData(): Observable<Service[]> {
  //   return this.http.get<Service[]>(this.baseUrl);
  // }

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
   
}
