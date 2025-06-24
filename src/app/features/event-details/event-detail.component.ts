import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../core/models/event.model';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, CapitalizePipe],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  event: Event | undefined;
  isBooked= false

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEvents().subscribe((events) => {
      this.event = events.find((e) => e.id === id);
      if (this.event) {
        this.isBooked = this.eventService.isEventBooked(this.event.id); // Check booking status
      }
    });
  }

  bookSeat() {
    if (this.event && this.event.seatsAvailable > 0) {
      this.event.seatsAvailable--;
      this.isBooked = true;
      alert('Seat booked!');
      this.eventService.bookEvent(this.event.id); 
      this.router.navigate(['/']);
    }
  }
  cancelBooking() {
    if (this.event && this.isBooked) {
      this.event.seatsAvailable++;
      this.isBooked = false;
      alert('Booking canceled!');
      this.eventService.cancelEventBooking(this.event.id); // Update booking status in the service
    }
  }
  
  
}
