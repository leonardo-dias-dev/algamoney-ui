import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Contato } from 'src/app/core/model/contato';
import { Estado } from 'src/app/core/model/estado';
import { Pessoa } from 'src/app/core/model/pessoa';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { PessoaService } from './../../core/service/pessoa.service';

@Component({
    selector: 'app-pessoa-cadastro',
    templateUrl: './pessoa-cadastro.component.html',
    styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

    public pessoa: Pessoa = new Pessoa();

    public estados: any[];
    public cidades: any[];

    public estadoSelecionado: number;

    constructor(private pessoaService: PessoaService,
        private messageService: MessageService,
        private errorHandler: ErrorHandlerService,
        private router: Router,
        private route: ActivatedRoute,
        private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle('Nova pessoa');

        this.carregarPessoa();
        this.carregarEstados();
    }

    private carregarPessoa(): void {
        const codigo: number = this.route.snapshot.params['codigo'];

        if (codigo === null || codigo === undefined) {
            return;
        }

        this.pessoaService.buscarPorCodigo(codigo)
            .then(pessoa => {
                this.pessoa = pessoa;

                if (this.pessoa.endereco.cidade) {
                    this.estadoSelecionado = this.pessoa.endereco.cidade.estado.codigo;
                    this.carregarCidades();
                }

                this.atualizarTituloEdicao();
            }).catch(error => this.errorHandler.handle(error));
    }

    private carregarEstados(): void {
        this.pessoaService.listarEstados()
            .then(estados => {
                this.estados = estados.map(e => ({ label: e.nome, value: e.codigo }));
            }).catch(error => this.errorHandler.handle(error));
    }

    public carregarCidades(): void {
        this.pessoaService.pesquisarCidades(this.estadoSelecionado)
        .then(cidades => {
            this.cidades = cidades.map(c => ({ label: c.nome, value: c.codigo }));
        }).catch(error => this.errorHandler.handle(error));
    }

    public salvar(form: FormControl): void {
        if (this.editando) {
            this.atualizarPessoa(form);
        } else {
            this.adicionarPessoa(form);
        }
    }

    public adicionarPessoa(form: FormControl): void {
        this.pessoaService.adicionar(this.pessoa)
            .then(pessoaAdicionada => {
                this.messageService.add({ severity: 'success', detail: 'Pessoa adicionada com sucesso!' });

                this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
            }).catch(error => this.errorHandler.handle(error));
    }

    public atualizarPessoa(form: FormControl): void {
        this.pessoaService.atualizar(this.pessoa)
            .then(pessoaAlterada => {
                this.pessoa = pessoaAlterada;

                this.atualizarTituloEdicao();

                this.messageService.add({ severity: 'success', detail: 'Pessoa alterada com sucesso!' });
            }).catch(error => this.errorHandler.handle(error));
    }

    public novo(form: FormControl): void {
        form.reset();

        setTimeout(function (): void {
            this.pessoa = new Pessoa();
        }.bind(this), 1);

        this.router.navigate(['/pessoas/nova']);
    }

    private atualizarTituloEdicao(): void {
        this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
    }

    public get editando(): boolean {
        return this.pessoa.codigo !== null && this.pessoa.codigo !== undefined;
    }

}
