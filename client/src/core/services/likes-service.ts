import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../../types/member';
import { PaginatedResult } from '../../types/pagination';

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

  getLikes(predicate: string, pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('predicate', predicate)

    const url = `${this.baseUrl}likes`;
    return this.http.get<PaginatedResult<Member>>(url, { params });
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
