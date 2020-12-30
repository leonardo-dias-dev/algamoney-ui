import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/service/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public pieChartData: any;
    public lineChartData: any;

    public options = {
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const dataset = data.datasets[tooltipItem.datasetIndex];
                    const valor = dataset.data[tooltipItem.index];
                    const label = dataset.label ? (dataset.label + ': ') : '';

                    return label + this.decimalPipe.transform(valor, '1.2-2');
                }
            }
        }
    };

    constructor(private dashboardService: DashboardService,
                private decimalPipe: DecimalPipe) { }

    ngOnInit(): void {
        this.configurarGraficoPizza();
        this.configurarGraficoLinha();
    }

    public configurarGraficoPizza(): void {
        this.dashboardService.lancamentoPorCategoria()
            .then(dados => {
                this.pieChartData = {
                    labels: dados.map(dado => dado.categoria.nome),
                    datasets: [
                        {
                            data: dados.map(dado => dado.total),
                            backgroundColor: ['#ff9900', '#109618', '#990099', '#3b3eac', '#0099c6', '#dd447', '#3366cc', '#dc3912']
                        }
                    ]
                };
            });
    }

    public configurarGraficoLinha(): void {
        this.dashboardService.lancamentoPorDia()
            .then(dados => {
                const diasDoMes: number[] = this.configurarDiasMes();
                const totaisReceitas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
                const totaisDespesas = this.totaisPorCadaDiaMes(dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

                this.lineChartData = {
                    labels: diasDoMes,
                    datasets: [
                        {
                            label: 'Receitas',
                            data: totaisReceitas,
                            borderColor: '#3366CC'
                        },
                        {
                            label: 'Despesas',
                            data: totaisDespesas,
                            borderColor: '#D62B00'
                        }
                    ]
                };
            });
    }

    private configurarDiasMes(): number[] {
        const mesReferencia: Date = new Date();

        mesReferencia.setMonth(mesReferencia.getMonth() + 1);
        mesReferencia.setDate(0);

        const quantidade = mesReferencia.getDate();
        const dias: number[] = [];

        for (let i = 1; i <= quantidade; i++) {
            dias.push(i);
        }

        return dias;
    }

    private totaisPorCadaDiaMes(dados: any, diasDoMês: number[]): number[] {
        const totais: number[] = [];

        for (const dia of diasDoMês) {
            let total = 0;

            for (const dado of dados) {
                if (dado.dia.getDate() === dia) {
                    total = dado.total;

                    break;
                }
            }

            totais.push(total);
        }

        return totais;
    }

}
