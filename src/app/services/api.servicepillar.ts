import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServicePillar } from '../models/servicePillar.model';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServicepillar {

  private baseUrl = environment.baseSPUrl;
  private servicePillars: ServicePillar[] = [];
  constructor(private http: HttpClient) { }

  getData(): Observable<ServicePillar[]> {
    return this.http.get<ServicePillar[]>(this.baseUrl +"/Get").pipe(
      catchError((error) => {
        console.error('API call failed:', error);
        // Return hardcoded fallback data
        console.log("Exception in calling service. Endpoint " + this.baseUrl);
        return of(this.getFallbackData());
      })
    );
  }

  saveServicePillarData(servicePillar: ServicePillar): Observable<any> {
    return this.http.post<any>(this.baseUrl, servicePillar);
  }

  private getFallbackData(): any[] {
    return [
      {
        id: 2,
        name: 'Digital Services',
        description: 'Digital Services',
        status: true
       }
    ];
  }
   
}
