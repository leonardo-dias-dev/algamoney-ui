import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

    private oauthTokenUrl: string;
    private tokensRevokeUrl: string;

    public jwtPayload: any;

    constructor(private http: HttpClient,
                private jwtHelper: JwtHelperService) {
        this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
        this.tokensRevokeUrl = `${environment.apiUrl}/tokens/revoke`;

        this.carregarToken();
    }

    public login(email: string, senha: string): Promise<void> {
        const headers = new HttpHeaders()
            .append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy')
            .append('Content-Type', 'application/x-www-form-urlencoded');

        const body = `username=${email}&password=${senha}&grant_type=password`;

        return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
            .toPromise()
            .then(response => this.armazenarToken(response['access_token']))
            .catch(response => {
                if (response.status === 400 && response.error.error === 'invalid_grant') {
                    return Promise.reject('Usuário ou senha inválida!');
                }

                return Promise.reject(response);
            });
    }

    private armazenarToken(token: string): void {
        this.jwtPayload = this.jwtHelper.decodeToken(token);

        localStorage.setItem('token', token);
    }

    private carregarToken(): void {
        const token: string = localStorage.getItem('token');

        if (token !== null && token !== undefined) {
            this.armazenarToken(token);
        }
    }

    public obterNovoAccessToken(): Promise<void> {
        const headers = new HttpHeaders()
            .append('Authorization', 'Basic YW5ndWxhcjphbmd1bGFy')
            .append('Content-Type', 'application/x-www-form-urlencoded');
        const body = 'grant_type=refresh_token';

        return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
            .toPromise()
            .then(response => {
                console.log('Novo access token criado!');

                this.armazenarToken(response['access_token']);

                return Promise.resolve(null);
            }).catch(response => {
                console.log('Erro ao renovar token.', response);
                return Promise.resolve(null);
            });
    }

    public temPermissao(permissao: string): boolean {
        return this.jwtPayload !== null && this.jwtPayload !== undefined && this.jwtPayload.authorities.includes(permissao);
    }

    public temPermissoes(permissoes: string[]): boolean {
        for (const permissao of permissoes) {
            if (this.temPermissao(permissao)) {
                return true;
            }
        }

        return false;
    }

    public isAccessTokenInvalido(): boolean {
        const token: string = localStorage.getItem('token');

        return token === null || token === undefined || this.jwtHelper.isTokenExpired(token);
    }

    public logout(): Promise<void> {
        return this.http.delete(this.tokensRevokeUrl, { withCredentials: true })
            .toPromise()
            .then(() => {
                this.limparAccessToken();
            });
    }

    private limparAccessToken(): void {
        localStorage.removeItem('token');
        this.jwtPayload = null;
    }

}
