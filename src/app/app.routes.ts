import { Routes } from '@angular/router';
import { EventListComponent } from './features/event-list/event-list.component';
import { EventDetailComponent } from './features/event-details/event-detail.component';
import { AddEventComponent } from './features/add-events/add-event.component';


export const routes: Routes = [
    {
      path: '',
      component: EventListComponent,
    },
    { path: 'event/:id', component: EventDetailComponent },
    { path: 'add-event', component: AddEventComponent },
    { path: 'edit-event/:id', component: AddEventComponent },
   

    
  ];
