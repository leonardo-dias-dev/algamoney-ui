import { Categoria } from './categoria';
import { Pessoa } from './pessoa';

export class Lancamento {

    public codigo: number;

    public tipo = 'RECEITA';

    public descricao: string;

    public dataVencimento: Date;

    public dataPagamento: Date;

    public valor: number;

    public observacao: string;

    public pessoa: Pessoa = new Pessoa();

    public categoria: Categoria = new Categoria();

    public anexo: string;

    public urlAnexo: string;

}