import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';

const routes: Routes = [
    {
        path: '',
        component: PessoaPesquisaComponent,
        data: { roules: ['ROLE_PESQUISAR_PESSOA'] },
        canActivate: [AuthGuard]
    },
    {
        path: 'nova',
        component: PessoaCadastroComponent,
        data: { roules: ['ROLE_CADASTRAR_PESSOA'] },
        canActivate: [AuthGuard]
    },
    {
        path: ':codigo',
        component: PessoaCadastroComponent,
        data: { roules: ['ROLE_CADASTRAR_PESSOA'] },
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
export class PessoasRoutingModule {

}