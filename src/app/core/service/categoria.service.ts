import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CategoriaService {

    private categoriasUrl: string;

    constructor(private http: HttpClient) {
        this.categoriasUrl = `${environment.apiUrl}/categorias`;
    }

    public listarTodas(): Promise<any> {
        return this.http.get(`${this.categoriasUrl}`)
            .toPromise()
            .then(response => response);
    }

}
