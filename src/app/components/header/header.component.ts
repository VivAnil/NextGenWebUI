import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isProfileOpen: boolean=false;
  displayProfile: string='none';
  email:string ='abc@defindia.org';
  roleId!: number;
  companyId!: number;
  userName: string = 'Azeem Khan';
  companyLogo: string = "../../../assets/images/logowhite.png"; // default
  constructor( private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
    let userString = localStorage.getItem('userRoleSettings');
    let userRoleSettings = userString ? JSON.parse(userString) : null;
    this.roleId = userRoleSettings.companyRoleId;
    this.companyId=userRoleSettings.companyId;
    this.userName = userRoleSettings.username;

     console.log('roleid ' + this.roleId + ' companyId = ' + this.companyId);
    });
    const logo = localStorage.getItem("companyLogo");
    if (logo) {
      // prepend correct base64 mime type
      this.companyLogo = `data:image/png;base64,${logo}`;
    }
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

