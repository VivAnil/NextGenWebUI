import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolemasterService } from '../../services/rolemaster.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isProfileOpen: boolean=false;
  displayProfile: string='none';
  email:string ='abc@defindia.org';
  constructor( private router: Router, private roleMasterService: RolemasterService) { }

  ngOnInit(): void {
  }
  openProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    if(this.displayProfile=='none') this.displayProfile='block';
    else this.displayProfile='none';
  }
  logout() {
    this.roleMasterService.logOut();
    this.router.navigate(['login']);
  }
}
