import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from '../../../core/services/member-service';
import { ImageUpload } from "../../../shared/image-upload/image-upload";
import { Photo } from '../../../types/member';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe, ImageUpload],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected memberSevice = inject(MemberService);
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
}
