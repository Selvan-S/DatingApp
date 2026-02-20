import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { MemberService } from '../../../core/services/member-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberService = inject(MemberService);
  protected members$: Observable<Member[]>;

  constructor() {
    this.members$ = this.memberService.getMembers();
  }
}
