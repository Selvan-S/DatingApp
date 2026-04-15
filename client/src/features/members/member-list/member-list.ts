import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { MemberService } from '../../../core/services/member-service';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../member-card/member-card";
import { PaginatedResult } from '../../../types/pagination';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberService = inject(MemberService);
  protected pagenatedMembers$: Observable<PaginatedResult<Member>>;

  constructor() {
    this.pagenatedMembers$ = this.memberService.getMembers();
  }
}
