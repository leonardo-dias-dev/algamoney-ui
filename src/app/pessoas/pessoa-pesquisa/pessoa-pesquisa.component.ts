import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Pessoa } from 'src/app/core/model/pessoa';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { PessoaFiltro, PessoaService } from '../../core/service/pessoa.service';

@Component({
    selector: 'app-pessoa-pesquisa',
    templateUrl: './pessoa-pesquisa.component.html',
    styleUrls: ['./pessoa-pesquisa.component.css']
})
export class PessoaPesquisaComponent implements OnInit {

    public pessoas: Pessoa[] = [];

    public filtro: PessoaFiltro = new PessoaFiltro();

    public totalRegistros = 0;

    @ViewChild('tabela') grid: Table;

    constructor(private pessoaService: PessoaService,
                private confirmation: ConfirmationService,
                private messageService: MessageService,
                private errorHandler: ErrorHandlerService,
                private authService: AuthService) { }

    ngOnInit() { }

    public pesquisar(pagina = 0): void {
        this.filtro.pagina = pagina;

        this.pessoaService.pesquisar(this.filtro)
            .then(resultado => {
                this.pessoas = resultado.pessoas;
                this.totalRegistros = resultado.total;
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public aoMudarPagina(event: LazyLoadEvent): void {
        const pagina = event.first / event.rows;

        this.pesquisar(pagina);
    }

    public confirmarExclusao(pessoa: Pessoa): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => this.excluir(pessoa)
        });
    }

    private excluir(pessoa: Pessoa): void {
        this.pessoaService.excluir(pessoa.codigo)
            .then(() => {
                this.grid.clear();

                this.messageService.add({ severity: 'success', detail: 'Pessoa excluída com sucesso' });
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public atualizarStatus(pessoa: Pessoa): void {
        const status: boolean = !pessoa.ativo;

        this.pessoaService.atualizarStatus(pessoa.codigo, status)
            .then(() => {
                pessoa.ativo = status;

                this.messageService.add({ severity: 'success', detail: `Pessoa ${status ? 'Ativada' : 'Desativada'} com sucesso!` });
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public temPermissao(permissao: string): void {
        this.authService.temPermissao(permissao);
    }

}
