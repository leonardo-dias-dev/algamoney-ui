import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contato } from 'src/app/core/model/contato';

@Component({
    selector: 'app-pessoa-cadastro-contato',
    templateUrl: './pessoa-cadastro-contato.component.html',
    styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {

    @Input()
    public contatos: Array<Contato>;

    public contato: Contato;

    private contatoIndex: number;

    public exibindoFormularioContato = false;

    constructor() { }

    ngOnInit(): void {
    }

    public prepararNovoContato(): void {
        this.exibindoFormularioContato = true;
        this.contatoIndex = this.contatos.length;

        this.contato = new Contato();
    }

    public prepararEdicaoContato(contato: Contato, index: number): void {
        this.contato = Contato.clone(contato);

        this.exibindoFormularioContato = true;
        this.contatoIndex = index;
    }

    public removerContato(index: number): void {
        this.contatos.splice(index, 1);
    }

    public confirmarContato(formControl: FormControl): void {
        this.contatos[this.contatoIndex] = Contato.clone(this.contato);

        this.exibindoFormularioContato = false;
        formControl.reset();
    }

    public get editando(): boolean {
        return this.contato !== null && this.contato !== undefined && this.contato.codigo !== null && this.contato.codigo !== undefined;
    }

}
