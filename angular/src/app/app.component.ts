import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<div>Hello World form Page!</div>'
})
export class AppComponent {
  title = 'Hi from Angular!';
}
