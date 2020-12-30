import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoaPesquisaComponent } from './pessoa-pesquisa/pessoa-pesquisa.component';
import { PessoasRoutingModule } from './pessoas-routing.module';
import { PessoaCadastroContatoComponent } from './pessoa-cadastro-contato/pessoa-cadastro-contato.component';



@NgModule({
    declarations: [
        PessoaCadastroComponent,
        PessoaPesquisaComponent,
        PessoaCadastroContatoComponent
    ],
    imports: [
        CommonModule,
        FormsModule,

        InputTextModule,
        ButtonModule,
        TableModule,
        TooltipModule,
        InputTextareaModule,
        CalendarModule,
        SelectButtonModule,
        DropdownModule,
        InputMaskModule,
        PanelModule,
        DialogModule,

        SharedModule,
        PessoasRoutingModule,

        HttpClientModule
    ],
    exports: []
})
export class PessoasModule { }
