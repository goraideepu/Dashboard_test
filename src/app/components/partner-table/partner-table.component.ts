import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner-table',
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  template: `
    <div class="dashboard-card">
      <ag-grid-angular
        class="ag-theme-alpine-dark"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [pagination]="true"
        [paginationAutoPageSize]="true"
        style="height: 400px; width: 100%;"
      >
      </ag-grid-angular>
    </div>
  `
})
export class PartnerTableComponent implements OnInit {
  rowData: any[] = [];
  columnDefs: ColDef[] = [
    { field: 'name', headerName: 'DC Partner Name', flex: 2 },
    { field: 'packoutReceiptTime', headerName: 'Packout message receipt to 3B18 elapsed time', flex: 1 },
    { field: 'packoutElapsedTime', headerName: 'Packout message to 3B2SC - elapsed time', flex: 1 }
  ];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getPartnerData().subscribe(data => {
      this.rowData = data;
    });
  }
}