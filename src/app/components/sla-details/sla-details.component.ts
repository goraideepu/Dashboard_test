import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { DashboardService } from '../../services/dashboard.service';
import { SLAViolation } from '../../models/dashboard.model';

@Component({
  selector: 'app-sla-details',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  template: `
    <div class="dashboard-card">
      <div class="header">
        <h2>SLA Violations Details</h2>
        <button class="back-button" (click)="onBack()">Back to Dashboard</button>
      </div>
      @if (loading) {
        <div class="loading-container">
          <div class="loading-spinner"></div>
        </div>
      } @else {
        <ag-grid-angular
          class="ag-theme-alpine-dark"
          [rowData]="violations"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [pagination]="true"
          [paginationAutoPageSize]="true"
          style="height: 600px; width: 100%;"
        >
        </ag-grid-angular>
      }
    </div>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .back-button {
      padding: 8px 16px;
      background-color: var(--primary-color);
      border: none;
      border-radius: 4px;
      color: white;
      cursor: pointer;
    }
    .back-button:hover {
      background-color: #1976d2;
    }
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
    }
    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class SLADetailsComponent implements OnInit {
  @Output() backToDashboard = new EventEmitter<void>();
  
  violations: SLAViolation[] = [];
  loading = true;

  columnDefs: ColDef[] = [
    { field: 'id', headerName: 'SLA Number', sortable: true, filter: true },
    { field: 'type', headerName: 'SLA Type', sortable: true, filter: true },
    { field: 'creationDate', headerName: 'Creation Date', sortable: true, filter: true },
    { field: 'status', headerName: 'Status', sortable: true, filter: true },
    { field: 'partner', headerName: 'Partner', sortable: true, filter: true },
    { field: 'elapsedTime', headerName: 'Elapsed Time', sortable: true, filter: true }
  ];

  defaultColDef: ColDef = {
    flex: 1,
    resizable: true
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadViolations();
  }

  loadViolations() {
    this.loading = true;
    this.dashboardService.getSLAViolations().subscribe({
      next: (data) => {
        this.violations = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading SLA violations:', error);
        this.loading = false;
      }
    });
  }

  onBack() {
    this.backToDashboard.emit();
  }
}