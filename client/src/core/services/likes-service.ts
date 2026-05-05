import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<string[]>([]);

  toggleLike(targetMemberId: string) {
    const url = `${this.baseUrl}likes/${targetMemberId}`;
    return this.http.post(url, {});
  }

  getLikes(predicate: string) {
    const url = `${this.baseUrl}likes?predicate=${predicate}`;
    return this.http.get<string[]>(url);
  }

  getLikeIds() {
    const url = `${this.baseUrl}likes/list`;
    return this.http.get<string[]>(url).subscribe({
      next: ids => this.likeIds.set(ids),
      error: err => console.error('Failed to fetch like IDs', err)
    })
  }

  clearLikeIds() {
    this.likeIds.set([]);
  }
}
