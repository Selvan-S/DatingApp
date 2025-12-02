import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  // set the response user data
  protected readonly sample = [] as any[];

  ngOnInit(): void {
    this.http.get<string>('https://localhost:5001/api/users').subscribe({

      next: (data) => {
        console.log(data);
        this.sample.push(...data as any);
      },
      error: (err) => {
        console.error('Error fetching title:', err);
      },
      complete: () => {
        console.log('Completed fetching title');
      }
    })
  }
}


