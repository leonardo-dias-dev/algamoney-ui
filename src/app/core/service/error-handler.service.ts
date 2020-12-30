import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotAuthenticatedError } from 'src/app/seguranca/money-http-interceptor';

@Injectable()
export class ErrorHandlerService {

    constructor(private messageService: MessageService,
                private router: Router) { }

    public handle(errorResponse: any): void {
        if (typeof errorResponse === 'string') {
            this.showMessage(errorResponse);
            return;
        }

        if (errorResponse instanceof NotAuthenticatedError) {
            this.showMessage('Sua sessão expirou!');
            this.router.navigate(['/login']);
            return;
        }

        if (errorResponse instanceof HttpErrorResponse && errorResponse.status >= 400 && errorResponse.status <= 499) {
            const httpErrorResponse: HttpErrorResponse = errorResponse as HttpErrorResponse;

            if (errorResponse.status === 403) {
                this.showMessage('Você não tem permissão para executar esta ação.');
                return;
            }

            if (httpErrorResponse.error !== null && httpErrorResponse.error !== undefined) {
                try {
                    this.showMessage(httpErrorResponse.error[0].message);
                    return;
                } catch (error) {}
            }
        }

        this.showMessage('Erro ao processar serviço remoto. Tente novamente.');
    }

    private showMessage(message: string): void {
        this.messageService.add({ severity: 'error', detail: message });
    }

}
