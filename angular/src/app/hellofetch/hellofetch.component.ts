import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hellofetch',
  standalone: true,
  imports: [],
  templateUrl: './hellofetch.component.html',
  styleUrl: './hellofetch.component.css'
})

export class HellofetchComponent{
  helloData = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://127.0.0.1:3210/api/hello').subscribe((response : any) => {
      this.helloData=response.text
    });
  }
}
