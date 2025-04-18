import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl : string = environment.baseAuthApiUrl;
  constructor(private http: HttpClient) { }
  user: User = { authenticated: true, roleid: 1 };
  private userRoleSettings: any = null;

  logOut() {
    this.userRoleSettings = null;
  }

  getUserSettings(): any {
    return this.userRoleSettings;
  }

  updateCurrentCompanyId(companyId: number) {
    this.userRoleSettings.companyId = companyId;
  }

  authenticate(loginObj: any): Observable<any> {
    //const payload = { username, password };

    return this.http.post<any>(this.baseUrl, loginObj).pipe(
      map((response:any) => {
        // Assuming a roleId exists on successful authentication
        this.userRoleSettings = response;
        response.username=loginObj.username;
        localStorage.setItem('userRoleSettings', JSON.stringify(response));
        return response;
      }),
      catchError((error) => {
        console.error('Error during authentication:', error);
        return of(-1); // Return -1 in case of an error
      })
    );
}
 

}
