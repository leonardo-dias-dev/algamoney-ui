import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pessoa } from '../model/pessoa';
import { Estado } from '../model/estado';
import { Cidade } from '../model/cidade';

export class PessoaFiltro {
    nome: string;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

    private pessoasUrl: string;
    private estadosUrl: string;
    private cidadesUrl: string;

    constructor(private http: HttpClient) {
        this.pessoasUrl = `${environment.apiUrl}/pessoas`;
        this.estadosUrl = `${environment.apiUrl}/estados`;
        this.cidadesUrl = `${environment.apiUrl}/cidades`;
    }

    public listarTodos(): Promise<any> {
        return this.http.get(`${this.pessoasUrl}`)
            .toPromise()
            .then(response => response['content']);
    }

    public pesquisar(filtro: PessoaFiltro): Promise<any> {
        let params = new HttpParams();
        if (filtro.nome) {
            params = params.set('nome', filtro.nome);
        }

        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());

        return this.http.get(`${this.pessoasUrl}`, { params })
            .toPromise()
            .then(response => {
                const pessoas = response['content'];
                const resultado = {
                    pessoas,
                    total: response['totalElements']
                };

                return resultado;
            });
    }

    public excluir(codigo: number): Promise<void> {
        return this.http.delete(`${this.pessoasUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
    }

    public atualizarStatus(codigo: number, status: boolean): Promise<void> {
        return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, status)
            .toPromise()
            .then(() => null);
    }

    public adicionar(pessoa: Pessoa): Promise<Pessoa> {
        return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
            .toPromise();
    }

    public atualizar(pessoa: Pessoa): Promise<Pessoa> {
        return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`, pessoa)
            .toPromise();
    }

    public buscarPorCodigo(codigo: number): Promise<Pessoa> {
        return this.http.get<Pessoa>(`${this.pessoasUrl}/${codigo}`)
            .toPromise();
    }

    public listarEstados(): Promise<Estado[]> {
        return this.http.get<Estado[]>(this.estadosUrl)
            .toPromise();
    }

    public pesquisarCidades(estado: number): Promise<Cidade[]> {
        let params: HttpParams = new HttpParams();

        params = params.set('estado', estado.toString());

        return this.http.get<Cidade[]>(this.cidadesUrl, { params })
            .toPromise();
    }

}
