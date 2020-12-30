import { Cidade } from './cidade';

export class Endereco {

    public logradouro: string;

    public numero: string;

    public complemento: string;

    public bairro: string;

    public cep: string;

    public cidade: Cidade = new Cidade();

}