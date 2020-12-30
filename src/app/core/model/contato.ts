export class Contato {

    public codigo: number;

    public nome: string;

    public email: string;

    public telefone: string;

    constructor(codigo?: number, nome?: string, email?: string, telefone?: string) {
        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    public static clone(referencia: Contato): Contato {
        return new Contato(referencia.codigo, referencia.nome, referencia.email, referencia.telefone);
    }

}