
import { Injectable } from '@angular/core';
import { Event } from '../models/event.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
    private _events: Event[] = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet',
      description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Mumbai',
      date: '2025-06-11',
      seatsAvailable: 40
    },
    {
      id: 2,
      title: 'Consectetur adipiscing elit.',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      location: 'Bangalore',
      date: '2025-06-10',
      seatsAvailable: 20
    }
  ];

  getEvents(): Observable<Event[]> {
    return of(this._events);
  }
  private eventsSubject = new BehaviorSubject<Event[]>(this._events);
  events$ = this.eventsSubject.asObservable();
  getEventById(id: number): Event | undefined {
    return this._events.find(e => e.id === id);
  }
  addEvent(newEvent: Event) {
    newEvent.id = this._events.length + 1;
    this._events.push(newEvent);
    this.eventsSubject.next(this._events);
  }
  updateEvent(updated: Event) {
    const index = this._events.findIndex(e => e.id === updated.id);
    if (index !== -1) {
      this._events[index] = updated;
     return this.eventsSubject.next(this._events);
    }
  }
  deleteEvent(id: number) {
    this._events = this._events.filter(e => e.id !== id);
    return this.eventsSubject.next(this._events);
  }
}
