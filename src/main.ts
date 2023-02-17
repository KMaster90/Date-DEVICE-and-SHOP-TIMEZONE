import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { DateComponent } from './date/date.component';
import './utils';
@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule,DateComponent],
  template: `
    <app-date></app-date>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
