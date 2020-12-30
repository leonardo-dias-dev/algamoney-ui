import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (this.authService.isAccessTokenInvalido()) {
            console.log('navegação com access token inválido. Obtendo novo token...');

            return this.authService.obterNovoAccessToken()
                .then(() => {
                    if (this.authService.isAccessTokenInvalido()) {
                        this.router.navigate(['/login']);
                        return false;
                    }

                    return true;
                });
        }

        if (route.data.roles != null && route.data.roles !== undefined && !this.authService.temPermissoes(route.data.roles)) {
            this.router.navigate(['/nao-autorizado']);

            return false;
        }

        return true;
    }

}
