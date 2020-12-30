import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { ErrorHandlerService } from 'src/app/core/service/error-handler.service';
import { LancamentoService } from 'src/app/core/service/lancamento.service';
import { PessoaService } from 'src/app/core/service/pessoa.service';

@Component({
    selector: 'app-lancamento-cadastro',
    templateUrl: './lancamento-cadastro.component.html',
    styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

    // public lancamento: Lancamento = new Lancamento();

    public formulario: FormGroup;

    public tipos = [
        { label: 'Receita', value: 'RECEITA' },
        { label: 'Despesas', value: 'DESPESA' }
    ];

    public categorias = [];
    public pessoas = [];

    public uploadEmAndamento = false;

    constructor(private categoriaService: CategoriaService,
                private errorHandler: ErrorHandlerService,
                private pessoaService: PessoaService,
                private lancamentoService: LancamentoService,
                private messageService: MessageService,
                private route: ActivatedRoute,
                private router: Router,
                private title: Title,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.configurarFormulario();

        this.title.setTitle('Novo lançamento');

        this.carregarLancamento();

        this.carregarCategorias();
        this.carregarPessoas();
    }

    public configurarFormulario(): void {
        this.formulario = this.formBuilder.group({
            codigo: [],
            tipo: ['RECEITA', Validators.required],
            dataVencimento: [null, Validators.required],
            dataPagamento: [],
            descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
            valor: [null, Validators.required],
            categoria: this.formBuilder.group({
                codigo: [null, Validators.required],
                nome: []
            }),
            pessoa: this.formBuilder.group({
                codigo: [null, Validators.required],
                nome: []
            }),
            observacao: [],
            anexo: [],
            urlAnexo: []
        });
    }

    public validarObrigatoriedade(input: FormControl) {
        return input.value ? null : { obrigatoriedade: true };
    }

    public validarTamanhoMinimo(valor: number) {
        return (input: FormControl) => {
            return !input.value || input.value.length >= valor ? null : { tamanhoMinimo: { tamanho: valor } };
        };
    }

    private carregarLancamento(): void {
        const codigo: number = this.route.snapshot.params['codigo'];

        if (codigo === null || codigo === undefined) {
            return;
        }

        this.lancamentoService.buscarPorCodigo(codigo)
            .then(lancamento => {
                this.formulario.patchValue(lancamento);

                this.atualizarTituloEdicao();
            }).catch(error => this.errorHandler.handle(error));
    }

    public salvar(): void {
        if (this.editando) {
            this.atualizarLancamento();
        } else {
            this.incluirLancamento();
        }
    }

    private incluirLancamento(): void {
        this.lancamentoService.adicionar(this.formulario.value)
            .then(lancamentoAdicionado => {
                this.messageService.add({ severity: 'success', detail: 'Lançamento adicionado com sucesso!' });

                this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
            }).catch(error => this.errorHandler.handle(error));
    }

    private atualizarLancamento(): void {
        this.lancamentoService.atualizar(this.formulario.value)
            .then(lancamento => {
                this.formulario.setValue(lancamento);

                this.atualizarTituloEdicao();

                this.messageService.add({ severity: 'success', detail: 'Lançamento alterado com sucesso!' });
            }).catch(error => this.errorHandler.handle(error));
    }

    public novo(): void {
        this.formulario.reset();

        this.router.navigate(['/lancamentos/novo']);
    }

    private carregarCategorias(): void {
        this.categoriaService.listarTodas()
            .then(categorias => {
                this.categorias = categorias.map(c => {
                    return { label: c.nome, value: c.codigo };
                });
            }).catch(error => this.errorHandler.handle(error));
    }

    private carregarPessoas(): void {
        this.pessoaService.listarTodos()
            .then(pessoas => {
                this.pessoas = pessoas.map(p => {
                    return { label: p.nome, value: p.codigo };
                });
            }).catch(error => this.errorHandler.handle(error));
    }

    public uploadHandler(files: Array<File>): void {
        this.uploadEmAndamento = true;

        this.lancamentoService.uploadAnexo(files[0])
            .then(response => {
                this.formulario.patchValue({
                    anexo: response.nome,
                    urlAnexo: response.url
                });

                this.uploadEmAndamento = false;
            }).catch(erro => {
                this.messageService.add({ severity: 'error', detail: 'Erro ao enviar anexo.' });
                this.uploadEmAndamento = false;
            });
    }

    public removerAnexo(): void {
        this.formulario.patchValue({
            anexo: null,
            urlAnexo: null
        });
    }

    public get editando(): boolean {
        return this.formulario.get('codigo').value !== null && this.formulario.get('codigo').value !== undefined;
    }

    public atualizarTituloEdicao(): void {
        this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
    }

}
