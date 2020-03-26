import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.user_type) === 'MANAGER') {
                // manager authorisation
                this.router.navigate(['/mamagement']);
                return true;
            } else if (route.data.roles && route.data.roles.indexOf(currentUser.user_type) === 'WAITER') {
                // waiter authorisation
                this.router.navigate(['/waiter']);
                return true;
            } else if (route.data.roles && route.data.roles.indexOf(currentUser.user_type) === 'KITCHEN') {
                // kitchen authorisation
                this.router.navigate(['/kitchen']);
              return true;
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}