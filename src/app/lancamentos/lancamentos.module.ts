import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { LancamentosRoutingModule } from './lancamentos-routing.module';



@NgModule({
    declarations: [
        LancamentoCadastroComponent,
        LancamentosPesquisaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        InputTextModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        InputTextareaModule,
        CalendarModule,
        SelectButtonModule,
        DropdownModule,
        InputNumberModule,
        FileUploadModule,
        ProgressSpinnerModule,

        SharedModule,
        LancamentosRoutingModule,

        HttpClientModule
    ],
    exports: []
})
export class LancamentosModule { }
