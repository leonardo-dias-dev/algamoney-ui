import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form/login-form.component';
import { SegurancaRoutingModule } from './seguranca-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyHttpInterceptor } from './money-http-interceptor';
import { AuthGuard } from './auth.guard';

export function tokenGetter(): string {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [LoginFormComponent],
    imports: [
        CommonModule,
        FormsModule,

        ButtonModule,
        InputTextModule,

        SegurancaRoutingModule,

        JwtModule.forRoot({
            config: {
                tokenGetter,
                allowedDomains: ['localhost:8080'],
                disallowedRoutes: ['http://localhost:8080/oauth/token']
            }
        })
    ],
    providers: [
        AuthGuard,
        JwtHelperService,
        { provide: HTTP_INTERCEPTORS, useClass: MoneyHttpInterceptor, multi: true }
    ]
})
export class SegurancaModule { }
