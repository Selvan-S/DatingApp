import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-main-photo-button',
  imports: [],
  templateUrl: './main-photo-button.html',
  styleUrl: './main-photo-button.css',
})
export class MainPhotoButton {
  @Input() isMain: boolean = false;
  @Input() disabled: boolean = false;

  @Output() select = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.select.emit();
    }
  }
}
