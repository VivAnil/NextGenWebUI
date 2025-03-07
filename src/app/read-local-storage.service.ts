import { Injectable } from '@angular/core';
import { CompanyRole } from './models/permission.model';

@Injectable({
  providedIn: 'root'
})
export class ReadLocalStorageService {
  private storageKey = 'userRoleSettings';

  constructor() {}

  getPermissions(): CompanyRole | null {
    const storedData = localStorage.getItem(this.storageKey);
    return storedData ? JSON.parse(storedData) : null;
  }
}
