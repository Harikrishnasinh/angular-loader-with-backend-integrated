import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  eventsource?: EventSource;
  private eventBehavior = new BehaviorSubject<any>({});
  constructor() {}

  // to connect...
  connect() {
    this.eventsource = new EventSource('http://localhost:3001/');
    this.eventsource.onmessage = (event) => {
      const data = event.data;
      this.eventBehavior.next(data);
    };
    this.eventsource.onerror = (error) => {
      this.eventBehavior.error(error);
    };
  }

  // to return the behavior subject...
  getEventBehaviorSubject(): BehaviorSubject<any> {
    return this.eventBehavior;
  }

  stopEvent() {
    this.eventsource?.close();
  }
}
