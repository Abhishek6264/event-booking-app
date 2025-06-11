import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../core/services/event.service'; 
import { Event } from '../../core/models/event.model';

import { RouterModule, Router } from '@angular/router';


import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { HighlightTodayDirective } from '../../directives/highlight-today.directive';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HighlightTodayDirective, CapitalizePipe],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  private eventService = inject(EventService);
  private router = inject(Router);

  events: Event[] = [];
  filteredEvents: Event[] = [];

  selectedLocation: string = '';
  selectedDate: string = '';

  ngOnInit() {
    this.eventService.getEvents().subscribe((data) => {
      this.events = data;
      this.filteredEvents = data;
    });
  }

  filterEvents() {
    this.filteredEvents = this.events.filter(event =>
      (!this.selectedLocation || event.location.toLowerCase().includes(this.selectedLocation.toLowerCase())) &&
      (!this.selectedDate || event.date === this.selectedDate)
    );
  }

  resetFilters() {
    this.selectedLocation = '';
    this.selectedDate = '';
    this.filteredEvents = this.events;
  }

 
  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id);
      this.events = this.events.filter(event => event.id !== id);
      this.filteredEvents = this.filteredEvents.filter(event => event.id !== id);
    }
  }
  
}
