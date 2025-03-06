import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true, // Torna o componente independente
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  passwordForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private dialogRef: MatDialogRef<ChangePasswordComponent>) {}

  get newPassword() {
    return this.passwordForm.get('newPassword')!;
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword')!;
  }

  passwordsMatch(): boolean {
    return this.newPassword.value === this.confirmPassword.value;
  }

  savePassword() {
    if (this.passwordForm.valid && this.passwordsMatch()) {
      this.dialogRef.close(this.newPassword.value);
    } else {
      this.confirmPassword.setErrors({ mismatch: true });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
