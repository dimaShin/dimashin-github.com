import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService implements CanActivate {

  private token: string = sessionStorage.getItem('session') || null;

  private redirectAfterLoginTo: Array<string | number> = [environment.baseRoute];

  private static isAuthRoute(route: ActivatedRouteSnapshot) {
    return route.routeConfig.path === environment.authRoute;
  }

  constructor(
    private router: Router
  ) { }

  private setToken(value: string) {

    this.token = value;

    if (!value) {
      sessionStorage.removeItem('session');
    } else {
      sessionStorage.setItem('session', value);
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLoggedIn = !!this.token;
    const isAuthRoute = AuthService.isAuthRoute(route);
    const canProceed = isAuthRoute ? !isLoggedIn : isLoggedIn;

    if (!canProceed) {
      this.redirectOnActivateFailed(route);
    }

    return canProceed;
  }

  private redirectOnActivateFailed(route: ActivatedRouteSnapshot) {
    const isAuthRoute = AuthService.isAuthRoute(route);
    const nextPath = isAuthRoute ? environment.baseRoute : environment.authRoute;

    if (!isAuthRoute) {
      this.redirectAfterLoginTo = route.url.map(({ path }) => path);
    }

    this.router.navigate([nextPath]);
  }

  async login(user: string): Promise<void> {
    this.setToken(btoa(user));
    this.router.navigate(this.redirectAfterLoginTo);
  }

  logout() {
    this.setToken(null);
    this.router.navigate([environment.authRoute]);
  }
}
