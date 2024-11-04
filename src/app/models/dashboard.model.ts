export interface SLAStats {
  violations: number;
  successRate: number;
  elapsedTime: string;
}

export interface MonthlyStats {
  slaBreached: number;
  b18Sent: number;
  b2scReceived: number;
  elapsedTime: string;
}

export interface PartnerData {
  name: string;
  packoutReceiptTime: string;
  packoutElapsedTime: string;
}

export interface ChartData {
  date: string;
  violations: number;
  sent: number;
  received: number;
}

export interface SLAViolation {
  id: number;
  type: string;
  creationDate: string;
  status: string;
  partner: string;
  elapsedTime: string;
}