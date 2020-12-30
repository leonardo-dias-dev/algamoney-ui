import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

@Injectable()
export class DashboardService {

    private lancamentosUrl: string;

    constructor(private http: HttpClient) {
        this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
    }

    public lancamentoPorCategoria(): Promise<Array<any>> {
        return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-categoria`)
            .toPromise()
            .then(response => response);
    }

    public lancamentoPorDia(): Promise<Array<any>> {
        return this.http.get<Array<any>>(`${this.lancamentosUrl}/estatisticas/por-dia`)
            .toPromise()
            .then(response => {
                this.converterStringsParaDatas(response);

                return response;
            });
    }

    private converterStringsParaDatas(dados: Array<any>): void {
        for (const dado of dados) {
            dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
        }
    }

}
