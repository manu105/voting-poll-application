import { Component, signal } from '@angular/core';
import { PollComponent } from "./poll/poll.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PollComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('poll-app');
}
