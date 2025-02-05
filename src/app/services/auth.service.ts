import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { catchError, map, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl : string = environment.baseAuthApiUrl;
  constructor(private http: HttpClient) { }
  private user: User = { authenticated: true, roleid: 1 };
  public userRoleSettings: any = null;

  logOut() {
    this.userRoleSettings = null;
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, loginObj).pipe(
      map((response: { roleId: any; }) => {
        // Assuming a roleId exists on successful authentication
        let companyRoleId = response && response.roleId ? response.roleId : -1;
      }),
      catchError(error => {
        console.error('Login failed');
        return of(error);  // Return false on error
      })
    );
  }

  authenticate(loginObj: any): Observable<any> {
    //const payload = { username, password };

    return this.http.post<any>(this.baseUrl, loginObj).pipe(
      // Extract the roleId from the response
      catchError((error) => {
        console.error('Error during authentication:', error);
        return of(-1); // Return -1 in case of an error
      })
    );
}
 

}
