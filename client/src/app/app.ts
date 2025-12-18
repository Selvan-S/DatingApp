import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";

@Component({
  selector: 'app-root',
  imports: [CommonModule, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('client');
  // set the response user data
  protected users: any = signal<any>([]);

  ngOnInit() {
    this.loadUsers();
  }

  private async loadUsers() {
    this.users.set(await this.getUsers());
  }

  async getUsers() {
    try {
      return lastValueFrom(this.http.get<string>('https://localhost:5001/api/users'));
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}


