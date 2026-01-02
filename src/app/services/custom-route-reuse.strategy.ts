
import { Injectable } from '@angular/core';
import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from '@angular/router';
import { LayoutComponent } from 'src/app/components/layout/layout.component';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedHandles = new Map<string, DetachedRouteHandle>();

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getKey(route);
    return key === 'layout';
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const key = this.getKey(route);
    if (key && handle) {
      this.storedHandles.set(key, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = this.getKey(route);
    return !!key && this.storedHandles.has(key);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const key = this.getKey(route);
    return key ? (this.storedHandles.get(key) ?? null) : null;
  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }

  // Identify the layout route by configured path or by component type
  private getKey(route: ActivatedRouteSnapshot): string | null {
    if (!route.routeConfig) return null;
    if (route.routeConfig.path === 'layout') return 'layout';
    if (route.routeConfig.component === LayoutComponent) return 'layout';
    return null;
  }

  // helper to clear cache (call from logout or when you need to reset)
  clearStoredHandles(): void {
    this.storedHandles.clear();
  }
}
