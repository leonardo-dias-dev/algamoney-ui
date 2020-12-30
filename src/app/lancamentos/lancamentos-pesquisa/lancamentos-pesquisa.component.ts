import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Lancamento } from 'src/app/core/model/lancamento';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { AuthService } from 'src/app/seguranca/auth.service';
import { LancamentoService } from '../../core/service/lancamento.service';
import { LancamentoFiltro } from '../../core/service/lancamento.service';

@Component({
    selector: 'app-lancamentos-pesquisa',
    templateUrl: './lancamentos-pesquisa.component.html',
    styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

    public lancamentos: Lancamento[] = [];

    public filtro: LancamentoFiltro = new LancamentoFiltro();

    public totalRegistros = 0;

    @ViewChild('tabela') grid: Table;

    constructor(private lancamentoService: LancamentoService,
                private messageService: MessageService,
                private confirmation: ConfirmationService,
                private errorHandler: ErrorHandlerService,
                private title: Title,
                private authService: AuthService) { }

    ngOnInit(): void {
        this.title.setTitle('Pesquisa de lançamentos');
    }

    public pesquisar(pagina = 0): void {
        this.filtro.pagina = pagina;

        this.lancamentoService.pesquisar(this.filtro)
            .then(resultado => {
                this.lancamentos = resultado.lancamentos;
                this.totalRegistros = resultado.total;
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public aoMudarPagina(event: LazyLoadEvent): void {
        const pagina = event.first / event.rows;

        this.pesquisar(pagina);
    }

    public confirmarExclusao(lancamento: Lancamento): void {
        this.confirmation.confirm({
            message: 'Tem certeza que deseja excluir?',
            accept: () => this.excluir(lancamento)
        });
    }

    private excluir(lancamento: Lancamento): void {
        this.lancamentoService.excluir(lancamento.codigo)
            .then(() => {
                this.grid.reset();

                this.messageService.add({ severity: 'success', detail: 'Lançamento excluído com sucesso' });
            }).catch(erro => this.errorHandler.handle(erro));
    }

    public temPermissao(permissao: string): boolean {
        return this.authService.temPermissao(permissao);
    }

}
