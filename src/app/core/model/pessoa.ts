import { Contato } from './contato';
import { Endereco } from './endereco';

export class Pessoa {

    public codigo: number;

    public nome: string;

    public ativo = true;

    public endereco: Endereco = new Endereco();

    public contatos: Array<Contato> = Array<Contato>();

}