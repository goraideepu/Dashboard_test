import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-card stats-card" [class.clickable]="clickable" (click)="onClick()">
      <div class="stats-label">{{ label }}</div>
      <div class="stats-value" [style.color]="valueColor">
        @if (loading) {
          <div class="loading-spinner"></div>
        } @else {
          {{ value }}
        }
      </div>
      @if (subtitle) {
        <div class="stats-subtitle">{{ subtitle }}</div>
      }
    </div>
  `,
  styles: [`
    .clickable {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .clickable:hover {
      transform: translateY(-2px);
    }
    .loading-spinner {
      width: 24px;
      height: 24px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class StatsCardComponent {
  @Input() label!: string;
  @Input() value!: string | number;
  @Input() subtitle?: string;
  @Input() valueColor: string = '#ffffff';
  @Input() clickable: boolean = false;
  @Input() loading: boolean = false;
  @Output() cardClick = new EventEmitter<void>();

  onClick() {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }
}