import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RelatoriosService } from 'src/app/core/service/relatorios.service';

@Component({
    selector: 'app-relatorio-lancamentos',
    templateUrl: './relatorio-lancamentos.component.html',
    styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {

    public periodoInicio: Date;
    public periodoFim: Date;

    public documento: any;
    public altura: number;

    constructor(private relatorioSerivce: RelatoriosService,
                private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.configurarAlturaPdf();
    }

    public gerar(): void {
        this.relatorioSerivce.relatoriosLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
            .then(relatorio => {
                this.documento = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(relatorio));
            });
    }

    private configurarAlturaPdf(): void {
        setTimeout(function(): void {
            this.altura = (document.documentElement.scrollHeight - document.body.scrollHeight) - 10;
        }.bind(this), 5);
    }

}
