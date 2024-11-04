import { Component, OnInit } from '@angular/core';
import { AgChartsAngular } from 'ag-charts-angular';
import { 
  AgChartOptions,
  AgAreaSeriesOptions,
  AgCartesianChartOptions,
  AgChartTheme
} from 'ag-charts-community';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [AgChartsAngular],
  template: `
    <div class="dashboard-card chart-wrapper">
      <ag-charts-angular 
        [options]="chartOptions"
        style="width: 100%; height: 400px;"
      ></ag-charts-angular>
    </div>
  `,
  styles: [`
    .chart-wrapper {
      height: 450px;
      margin-bottom: 20px;
    }
  `]
})
export class StatsChartComponent implements OnInit {
  private chartData: any[] = [];
  
  chartOptions: AgCartesianChartOptions = {
    autoSize: true,
    padding: {
      top: 10,
      right: 30,
      bottom: 30,
      left: 30
    },
    data: [],
    theme: {
      palette: {
        fills: ['#4caf50', '#2196f3', '#ff5722'],
        strokes: ['#4caf50', '#2196f3', '#ff5722'],
      },
      overrides: {
        cartesian: {
          series: {
            area: {
              fillOpacity: 0.3
            }
          }
        }
      }
    } as AgChartTheme,
    axes: [
      {
        type: 'category',
        position: 'bottom',
        title: { text: 'Date' },
        label: {
          rotation: 0
        }
      },
      {
        type: 'number',
        position: 'left',
        title: { text: 'Count' },
        label: {
          formatter: (params) => params.value.toLocaleString()
        }
      }
    ],
    series: [
      {
        type: 'area',
        xKey: 'date',
        yKey: 'sent',
        name: '3B18 Sent',
        strokeWidth: 3,
        marker: {
          enabled: true,
          size: 6,
        }
      } as AgAreaSeriesOptions,
      {
        type: 'area',
        xKey: 'date',
        yKey: 'received',
        name: '3B2SC Received',
        strokeWidth: 3,
        marker: {
          enabled: true,
          size: 6,
        }
      } as AgAreaSeriesOptions,
      {
        type: 'area',
        xKey: 'date',
        yKey: 'violations',
        name: 'SLA Violations',
        strokeWidth: 3,
        marker: {
          enabled: true,
          size: 6,
        }
      } as AgAreaSeriesOptions
    ],
    legend: {
      position: 'bottom',
      spacing: 40
    },
    title: {
      text: 'SLA Metrics Over Time',
      fontSize: 18,
    }
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadChartData();
  }

  private loadChartData() {
    this.dashboardService.getChartData().subscribe({
      next: (data) => {
        this.chartData = data;
        this.updateChart();
      },
      error: (error) => {
        console.error('Error loading chart data:', error);
      }
    });
  }

  private updateChart() {
    this.chartOptions = {
      ...this.chartOptions,
      data: this.chartData
    };
  }
}