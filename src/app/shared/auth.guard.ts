import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthStateService } from './auth-state.service';
import { PlanStateService } from './plan.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthStateService,
        private plan: PlanStateService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.routeConfig.path == 'login' || route.routeConfig.path == 'landing' || route.routeConfig.path == 'register') {
            if (this.auth.getAuthState()) {  
                this.router.navigate(['total']);
            }
            return true;
        } else if (!this.auth.getAuthState()) {
            // check if route is restricted by role
            this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
            return false;
        }

        if (!this.plan.isAvaliable() && route.routeConfig.path !== 'account' && route.routeConfig.path !== 'upgrade-account') {
            this.router.navigateByUrl('/account?tab=plan');
        }


        return true;
    }
}