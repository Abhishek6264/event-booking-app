import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/models/event.model';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  private eventService = inject(EventService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  editId: string = '';

  event: Partial<Event> = {
    title: '',
    description: '',
    location: '',
    date: '',
    seatsAvailable: 0,
  };
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editId = id;
      const fetchedEvent = this.eventService.getEventById(Number(id));
      if (fetchedEvent) {
        this.event = {
          ...fetchedEvent,
        };

      }
     
    }
  }
  submitForm() {
    if (
      this.event.title &&
      this.event.description &&
      this.event.location &&
      this.event.date &&
      this.event.seatsAvailable! > 0
    ) {
      if(this.isEditMode) {
        this.eventService.updateEvent({
          ...this.event,
          id: Number(this.editId) 
        } as Event);
        alert('Event updated successfully!');
        this.router.navigate(['/']);
      } else {
      this.eventService.addEvent(this.event as Event);
      alert('Event added successfully!');
      this.router.navigate(['/']);
      }
    } else {
      alert('Please fill in all fields correctly.');
    }
  }

 
}
