import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/seguranca/auth.service';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    constructor(private authService: AuthService,
                private errorHandler: ErrorHandlerService,
                private router: Router) { }

    ngOnInit(): void {
    }

    public login(email: string, senha: string): void {
        this.authService.login(email, senha)
            .then(() => {
                this.router.navigate(['/dashboard']);
            }).catch(erro => this.errorHandler.handle(erro));
    }

}
