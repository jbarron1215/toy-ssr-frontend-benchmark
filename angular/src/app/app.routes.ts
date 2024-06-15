import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { HellofetchComponent } from './hellofetch/hellofetch.component';

export const routes: Routes = [
  {
    path: 'hello',
    component: HelloComponent,
    title: 'Hello',
  },
  {
    path: 'hello-fetch',
    component: HellofetchComponent,
    title: 'Hello Fetch',
  },
];
