import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isProfileOpen: boolean=false;
  displayProfile: string='none';
  email:string ='abc@defindia.org';
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  openProfile() {
    this.isProfileOpen = !this.isProfileOpen;
    if(this.displayProfile=='none') this.displayProfile='block';
    else this.displayProfile='none';
  }
  logout(){
    this.router.navigate(['login']);
  }
}
