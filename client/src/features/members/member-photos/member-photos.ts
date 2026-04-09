import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { DeleteButton } from "../../../shared/delete-button/delete-button";
import { ImageUpload } from "../../../shared/image-upload/image-upload";
import { StarButton } from "../../../shared/star-button/star-button";
import { Member, Photo } from '../../../types/member';
import { User } from '../../../types/user';

@Component({
  selector: 'app-member-photos',
  imports: [ImageUpload, StarButton, DeleteButton],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected memberSevice = inject(MemberService);
  protected accountService = inject(AccountService);
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
        if (!this.memberSevice.member()?.imageUrl) {
          this.setMainLocalPhoto(photo);
        }
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
        this.setMainLocalPhoto(photo);
      }
    });
  }

  deletePhoto(photoId: number) {
    this.memberSevice.deletePhoto(photoId).subscribe({
      next: () => {
        this.photos.update(photos => photos.filter(p => p.id !== photoId));
      },
      error: err => console.error('Error deleting photo:', err)
    });
  }

  setMainLocalPhoto(photo: Photo) {
    const currentMember = this.accountService.currentUser();
    if (currentMember) currentMember.imageUrl = photo.url;
    this.accountService.setCurrentUser(currentMember as User);
    this.memberSevice.member.update(member => ({
      ...member,
      imageUrl: photo.url
    }) as Member);
  }

}
