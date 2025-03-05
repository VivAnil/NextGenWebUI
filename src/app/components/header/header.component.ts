import { ReadLocalStorageService } from './../../read-local-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyRole } from 'src/app/models/permission.model';
import { ReadLocalStorageService } from 'src/app/read-local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyRole: CompanyRole | null = null;
  companyId: number | null = null;
  roleId: number | null = null;

  isProfileOpen: boolean=false;
  displayProfile: string='none';
  email:string ='abc@defindia.org';
  constructor( private router: Router, private authService: AuthService, private route: ActivatedRoute, private localStorage: ReadLocalStorageService) { }

  ngOnInit(): void {
    this.companyRole = this.localStorage.getPermissions();
    if (this.companyRole) {
      this.companyId = this.companyRole.companyId;
      this.roleId = this.companyRole.companyRoleId;
    }

    this.route.params.subscribe((params) => {
      this.roleId = +params['roleid'];
     console.log('roleid ' + this.roleId);
    });
  }
  openProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    if(this.displayProfile=='none') this.displayProfile='block';
    else this.displayProfile='none';
  }
  logout() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
  resetPassword(){
    
    this.router.navigate(['/resetpassword'], {
      queryParams: { companyId: 9, roleId: 1 }
    });
  }
}

