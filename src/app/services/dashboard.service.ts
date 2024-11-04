import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SLAStats, MonthlyStats, PartnerData, ChartData, SLAViolation } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private mockPartnerData: PartnerData[] = [
    { name: 'SENAO NETWORKS INC', packoutReceiptTime: '10 min', packoutElapsedTime: '6 min' },
    { name: 'Delta Networks (DNI)', packoutReceiptTime: '25 min', packoutElapsedTime: '10 min' },
    { name: 'Lite On Technology Corp', packoutReceiptTime: '5 min', packoutElapsedTime: '12 min' },
    { name: 'Cloud Network Technology Singapore Pte Ltd', packoutReceiptTime: '15 min', packoutElapsedTime: '25 min' },
    { name: 'Sercomm Corp.', packoutReceiptTime: '8 min', packoutElapsedTime: '4 min' },
    { name: 'VIVOTEK INC', packoutReceiptTime: '12 min', packoutElapsedTime: '10 min' },
    { name: 'Foxconn', packoutReceiptTime: '6 min', packoutElapsedTime: '8 min' }
  ];

  private mockSLAViolations: SLAViolation[] = [
    { id: 1, type: 'Response Time', creationDate: '2024-01-05 09:30:00', status: 'Open', partner: 'SENAO NETWORKS INC', elapsedTime: '15 min' },
    { id: 2, type: 'Processing Time', creationDate: '2024-01-05 10:15:00', status: 'Open', partner: 'Delta Networks (DNI)', elapsedTime: '25 min' },
    { id: 3, type: 'Response Time', creationDate: '2024-01-05 11:00:00', status: 'Resolved', partner: 'Foxconn', elapsedTime: '12 min' }
  ];

  getTodayStats(): Observable<SLAStats> {
    return of({
      violations: 50,
      successRate: 99.43,
      elapsedTime: '10 Min'
    }).pipe(delay(500));
  }

  getMonthlyStats(): Observable<MonthlyStats> {
    return of({
      slaBreached: 256,
      b18Sent: 4023,
      b2scReceived: 2356,
      elapsedTime: '10 Min'
    }).pipe(delay(500));
  }

  getPartnerData(): Observable<PartnerData[]> {
    return of(this.mockPartnerData).pipe(delay(500));
  }

  getChartData(): Observable<ChartData[]> {
    return of([
      { date: '01-OCT-24', violations: 15, sent: 10, received: 5 },
      { date: '02-OCT-24', violations: 50, sent: 45, received: 65 },
      { date: '03-OCT-24', violations: 72, sent: 32, received: 34 },
      { date: '04-OCT-24', violations: 15, sent: 10, received: 5 },
      { date: '05-OCT-24', violations: 50, sent: 45, received: 65 }
    ]).pipe(delay(500));
  }

  getSLAViolations(): Observable<SLAViolation[]> {
    return of(this.mockSLAViolations).pipe(delay(500));
  }
}