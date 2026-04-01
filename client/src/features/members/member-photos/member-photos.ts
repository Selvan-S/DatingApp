import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../core/services/member-service';
import { ImageUpload } from "../../../shared/image-upload/image-upload";
import { Member, Photo } from '../../../types/member';
import { User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { MainPhotoButton } from "../../../shared/main-photo-button/main-photo-button";
import { StarButton } from "../../../shared/star-button/star-button";

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload, MainPhotoButton, StarButton],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected memberSevice = inject(MemberService);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  protected photos = signal<Photo[]>([]);
  protected loading = signal(false);

  ngOnInit(): void {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.memberSevice.getMemberPhotos(memberId).subscribe({
        next: photos => this.photos.set(photos),
        error: err => console.error('Error fetching photos:', err)
      })
    }
  }

  onUploadImage(file: File) {
    this.loading.set(true);
    this.memberSevice.uploadPhoto(file).subscribe({
      next: photo => {
        this.memberSevice.editMode.set(false);
        this.photos.update(photos => [...photos, photo]);
        this.loading.set(false);
      },
      error: err => {
        console.error('Error uploading photo:', err);
        this.loading.set(false);
      }
    });
  }

  setMainPhoto(photo: Photo) {
    this.memberSevice.setMainPhoto(photo).subscribe({
      next: () => {
        const currentMember = this.accountService.currentUser();
        if (currentMember) currentMember.imageUrl = photo.url;
        this.accountService.setCurrentUser(currentMember as User);
        this.memberSevice.member.update(member => ({
          ...member,
          imageUrl: photo.url
        }) as Member);
      }
    });
  }

}
