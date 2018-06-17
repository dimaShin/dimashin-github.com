import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Injectable()
export class AuthService implements CanActivate {

  private _token: string = sessionStorage.getItem('session') || null;

  private redirectAfterLoginTo: Array<string | number> = [environment.baseRoutePath];

  private static isAuthRoute(route: ActivatedRouteSnapshot) {
    return route.url[0].path === environment.authRoutePath;
  }

  constructor(
    private router: Router
  ) { }

  private set token(value: string) {
    this._token = value;

    if (!value) {
      sessionStorage.removeItem('session');
    } else {
      sessionStorage.setItem('session', value);
    }
  }

  private get token(): string {
    return this._token;
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
    const { baseRoutePath, authRoutePath } = environment;
    const nextPath = isAuthRoute ? baseRoutePath : authRoutePath;

    if (!isAuthRoute) {
      this.redirectAfterLoginTo = route.url.map(({ path }) => path);
    }

    this.router.navigate([nextPath]);
  }

  async login(user: string): Promise<void> {
    this.token = btoa(user);
    this.router.navigate(this.redirectAfterLoginTo);
  }

  logout() {
    this.token = null;
    this.router.navigate([environment.authRoutePath]);
  }
}
