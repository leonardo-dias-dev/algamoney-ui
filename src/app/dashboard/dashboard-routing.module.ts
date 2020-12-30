import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
