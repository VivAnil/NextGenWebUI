import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NextGenMeraApp.UI';
  showSidebar = true;
  showHeader = true;
  private navSub!: Subscription;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateLayoutVisibility(this.router.url);

    // simpler subscription avoids typings/operator issues
    this.navSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateLayoutVisibility(event.urlAfterRedirects);
      }
    });
  }

  private updateLayoutVisibility(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    const isLogin = path === '/login' || path.startsWith('/login/');
    const isOrg = path === '/organisation' || path.startsWith('/organisation/');
    // Sidebar hidden on login and organisation (existing behaviour)
    this.showSidebar = !(isLogin || isOrg);
    // Header hidden on login only (per request)
    this.showHeader = !isLogin;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }
}
