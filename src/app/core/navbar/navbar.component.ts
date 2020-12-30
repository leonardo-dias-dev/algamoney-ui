import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from '../service/error-handler.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public exibindoMenu = false;

    constructor(private authService: AuthService,
                private errorHandler: ErrorHandlerService,
                private router: Router) { }

    ngOnInit(): void {
    }

    public logout(): void {
        this.authService.logout()
            .then(() => {
                this.router.navigate(['/login']);
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public temPermissao(permissao: string): boolean {
        return this.authService.temPermissao(permissao);
    }

    public get nomeUsuarioLogado(): string {
        return this.authService.jwtPayload?.nome;
    }

}
