import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  // set the response user data
  protected users: any = signal<any>([]);

  ngOnInit() {
    this.loadUsers();
    this.setCurrentUser();
  }

  private async loadUsers() {
    this.users.set(await this.getUsers());
  }

  setCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.accountService.currentUser.set(user);
    }
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


