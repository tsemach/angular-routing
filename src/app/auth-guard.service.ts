import {
  Router,
  CanActivate,
  RouterStateSnapshot,  
  ActivatedRouteSnapshot,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.isAuthenticated()
        .then(
          /**
           * if the user is autheticated then continue as regular.
           * else nativate to some place else inform his he is not autheticated
           */
          (authenticated: boolean) => {
            if (authenticated) {
              return true;
            }
            this.router.navigate(['/']);
          }
        );
    } 

    canActivateChild(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
      }
}
 