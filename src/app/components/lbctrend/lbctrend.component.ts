import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-lbctrend',
  templateUrl: './lbctrend.component.html',
  styleUrls: ['./lbctrend.component.css']
})
export class LbctrendComponent implements OnInit {

  constructor(private apiService: ApiService,
    private menuService: MenuService) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // Wait until DOM and child views are fully rendered
    setTimeout(() => {
      this.updatePath();
    });
  }

  updatePath(): void {
    console.log('updatepath');
    this.menuService.resetMenu();
    this.menuService.updateMenuItems([
      {
        title: 'User Details',
        links: [
        ]
      },
      {
        title: 'Company Details',
        links: [
        ]
      },
      {
        title: 'Service Section',
        links: [
        ]
      },
      {
        title: 'Business Section',
        links: [
          { label: 'View All Products', path: '/businessproduct' },
          { label: 'LBC Reports', path: '/lbcreports' }
        ]
      },
      {
        title: 'Reports Section',
        links: [
          { label: 'LBC Reports', path: '/lbcreport' },
          { label: 'LBC Business Analysis', path: '/lbcba' },
          { label: 'LBC Trend Analysis', path: '/lbctrend' }
        ]
      }
    ]);
  }

}
