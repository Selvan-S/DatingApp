import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected creds = {} as RegisterCreds;

  protected register() {
    console.log('Registering user with creds:', this.creds);
  }

  cancel() {
    console.log('Registration cancelled.');
  }
}
