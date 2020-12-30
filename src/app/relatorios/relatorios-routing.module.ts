import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { RelatorioLancamentosComponent } from './relatorio-lancamentos/relatorio-lancamentos.component';

const routes: Routes = [
    {
        path: 'lancamentos',
        component: RelatorioLancamentosComponent,
        data: { roules: ['ROLE_PESQUISAR_LANCAMENTO'] },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
