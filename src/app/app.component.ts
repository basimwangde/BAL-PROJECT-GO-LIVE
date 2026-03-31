import { Component } from '@angular/core';
import { EventDisplayComponent } from './features/event-display/event-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EventDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}

