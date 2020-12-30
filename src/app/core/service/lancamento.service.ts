import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Lancamento } from '../model/lancamento';

export class LancamentoFiltro {
    descricao: string;
    dataVencimentoInicio: Date;
    dataVencimentoFim: Date;
    pagina = 0;
    itensPorPagina = 5;
}

@Injectable()
export class LancamentoService {

    private lancamentosUrl: string;

    constructor(private http: HttpClient) {
        this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    }

    public pesquisar(filtro: LancamentoFiltro): Promise<any> {
        let params = new HttpParams();
        if (filtro.descricao) {
            params = params.set('descricao', filtro.descricao);
        }

        if (filtro.dataVencimentoInicio) {
            params = params.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
        }

        if (filtro.dataVencimentoFim) {
            params = params.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
        }

        params = params.set('page', filtro.pagina.toString());
        params = params.set('size', filtro.itensPorPagina.toString());

        return this.http.get(`${this.lancamentosUrl}?resumo`, { params })
            .toPromise()
            .then(response => {
                const lancamentos = response['content'];
                const resultado = {
                    lancamentos,
                    total: response['totalElements']
                };

                return resultado;
            });
    }

    public excluir(codigo: number): Promise<void> {
        return this.http.delete(`${this.lancamentosUrl}/${codigo}`)
            .toPromise()
            .then(() => null);
    }

    public adicionar(lancamento: Lancamento): Promise<Lancamento> {
        return this.http.post<Lancamento>(this.lancamentosUrl, lancamento)
            .toPromise()
            .then(lancamentoAdicionado => lancamentoAdicionado);
    }

    public atualizar(lancamento: Lancamento): Promise<Lancamento> {
        return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`, lancamento)
            .toPromise()
            .then(lancamentoAlterado => {
                this.converterStringsParaDatas([lancamentoAlterado]);

                return lancamento;
            });
    }

    public buscarPorCodigo(codigo: number): Promise<Lancamento> {
        return this.http.get<Lancamento>(`${this.lancamentosUrl}/${codigo}`)
            .toPromise()
            .then(lancamento => {
                this.converterStringsParaDatas([lancamento]);

                return lancamento;
            });
    }

    public uploadAnexo(file: File): Promise<any> {
        const formData: FormData = new FormData();
        formData.append('anexo', file);

        return this.http.post(`${this.lancamentosUrl}/anexo`, formData)
            .toPromise();
    }

    private converterStringsParaDatas(lancamentos: Lancamento[]): void {
        lancamentos.forEach(l => {
            l.dataVencimento = moment(l.dataVencimento).toDate();

            if (l.dataPagamento !== null && l.dataPagamento !== undefined) {
                l.dataPagamento = moment(l.dataPagamento).toDate();
            }
        });
    }

}
