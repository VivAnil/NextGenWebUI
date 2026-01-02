import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'NextGenMeraApp.UI';
  showSidebar = true;
  private navSub!: Subscription;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateSidebarVisibility(this.router.url);

    // use a type-guard in filter so the event narrows to NavigationEnd
    this.navSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(event => {
        this.updateSidebarVisibility(event.urlAfterRedirects);
      });
  }

  private updateSidebarVisibility(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    const isLogin = path === '/login' || path.startsWith('/login/');
    const isOrg = path === '/organisation' || path.startsWith('/organisation/');
    this.showSidebar = !(isLogin || isOrg);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.navSub?.unsubscribe();
  }
}
