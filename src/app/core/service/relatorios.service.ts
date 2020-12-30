import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable()
export class RelatoriosService {

    private lancamentosUrl: string;

    constructor(private http: HttpClient) {
        this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    }

    public relatoriosLancamentosPorPessoa(inicio: Date, fim: Date): Promise<any> {
        const params: HttpParams = new HttpParams()
            .set('inicio', moment(inicio).format('YYYY-MM-DD'))
            .set('fim', moment(fim).format('YYYY-MM-DD'));

        return this.http.get(`${this.lancamentosUrl}/relatorios/por-pessoa`, { params, responseType: 'blob' })
            .toPromise();
    }

}
