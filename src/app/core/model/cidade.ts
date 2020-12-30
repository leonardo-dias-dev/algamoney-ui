import { Estado } from './estado';

export class Cidade {

    public codigo: number;

    public nome: string;

    public estado: Estado = new Estado();

}