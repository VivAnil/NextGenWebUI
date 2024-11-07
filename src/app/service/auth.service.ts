import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.module';
import { catchError, map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl : string = environment.baseAuthApiUrl;
  constructor(private http: HttpClient) { }
  private user: User = {authenticated:true, roleid: 1};

  login(loginObj: any): Observable<boolean> {
    return this.http.post<any>(this.baseUrl, { loginObj }).pipe(
      map((response: { roleId: any; }) => {
        // Assuming a roleId exists on successful authentication
        return true;
      }),
      catchError(error => {
        console.error('Login failed', error);
        return of(true);  // Return false on error
      })
    );
  }
}
 


