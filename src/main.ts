import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './app/components/stats-card/stats-card.component';
import { PartnerTableComponent } from './app/components/partner-table/partner-table.component';
import { StatsChartComponent } from './app/components/stats-chart/stats-chart.component';
import { SLADetailsComponent } from './app/components/sla-details/sla-details.component';
import { DashboardService } from './app/services/dashboard.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StatsCardComponent,
    PartnerTableComponent,
    StatsChartComponent,
    SLADetailsComponent
  ],
  template: `
    @if (!showSLADetails) {
      <div class="dashboard-container">
        <div class="grid-container">
          <div class="stats-section">
            <h2>Today</h2>
            <app-stats-card
              label="SLA Violations"
              [value]="todayStats?.violations"
              valueColor="#ff5722"
              [clickable]="true"
              [loading]="loading"
              (cardClick)="toggleSLADetails(true)"
            ></app-stats-card>
            <app-stats-card
              label="Success Rate"
              [value]="todayStats?.successRate + '%'"
              valueColor="#4caf50"
              [loading]="loading"
            ></app-stats-card>
            <app-stats-card
              label="Elapsed Time"
              [value]="todayStats?.elapsedTime"
              [loading]="loading"
            ></app-stats-card>
          </div>

          <div class="stats-section">
            <h2>This Month</h2>
            <app-stats-card
              label="SLA Breached"
              [value]="monthlyStats?.slaBreached"
              valueColor="#ff5722"
              [loading]="loading"
            ></app-stats-card>
            <app-stats-card
              label="3B18 Sent"
              [value]="monthlyStats?.b18Sent"
              valueColor="#4caf50"
              [loading]="loading"
            ></app-stats-card>
            <app-stats-card
              label="3B2SC Received"
              [value]="monthlyStats?.b2scReceived"
              valueColor="#2196f3"
              [loading]="loading"
            ></app-stats-card>
            <app-stats-card
              label="Elapsed Time"
              [value]="monthlyStats?.elapsedTime"
              [loading]="loading"
            ></app-stats-card>
          </div>
        </div>

        <app-partner-table></app-partner-table>
        <div class="chart-container">
          <app-stats-chart></app-stats-chart>
        </div>
      </div>
    } @else {
      <app-sla-details (backToDashboard)="toggleSLADetails(false)"></app-sla-details>
    }
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    .chart-container {
      margin-top: 20px;
      height: 400px;
    }
  `]
})
export class App implements OnInit {
  todayStats: any;
  monthlyStats: any;
  loading = true;
  showSLADetails = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.dashboardService.getTodayStats().subscribe({
      next: (data) => {
        this.todayStats = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading today stats:', error);
        this.loading = false;
      }
    });

    this.dashboardService.getMonthlyStats().subscribe({
      next: (data) => {
        this.monthlyStats = data;
      },
      error: (error) => {
        console.error('Error loading monthly stats:', error);
      }
    });
  }

  toggleSLADetails(show: boolean) {
    this.showSLADetails = show;
  }
}

bootstrapApplication(App, {
  providers: [
    DashboardService
  ]
}).catch(err => console.error(err));