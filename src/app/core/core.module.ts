import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../seguranca/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { CategoriaService } from './service/categoria.service';
import { ErrorHandlerService } from './service/error-handler.service';
import { LancamentoService } from './service/lancamento.service';
import { PessoaService } from './service/pessoa.service';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardService } from './service/dashboard.service';
import { RelatoriosService } from './service/relatorios.service';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
    declarations: [
        NavbarComponent,
        PaginaNaoEncontradaComponent,
        NaoAutorizadoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,

        ToastModule,
        ConfirmDialogModule,
        HttpClientModule
    ],
    exports: [
        NavbarComponent,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [
        LancamentoService,
        PessoaService,
        CategoriaService,
        DashboardService,
        RelatoriosService,
        ErrorHandlerService,
        AuthService,

        Title,
        MessageService,
        ConfirmationService,
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ]
})
export class CoreModule { }
