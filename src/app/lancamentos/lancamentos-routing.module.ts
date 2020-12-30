import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: LancamentosPesquisaComponent,
        data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] },
        canActivate: [AuthGuard]
    },
    {
        path: 'novo',
        component: LancamentoCadastroComponent,
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] },
        canActivate: [AuthGuard]
    },
    {
        path: ':codigo',
        component: LancamentoCadastroComponent,
        data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class LancamentosRoutingModule {

}