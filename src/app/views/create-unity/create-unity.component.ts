import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-unity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    NgxMaskDirective,
    MatButtonModule,
  ],
  templateUrl: './create-unity.component.html',
  styleUrls: ['./create-unity.component.css'],
})
export class CreateUnityComponent {
  constructor(private router: Router) {}

  onSubmit(userForm: any): void {
    console.log('Form Values:', userForm.value);
  }
  goToDashboard(userForm: any): void {
    userForm.reset();
    this.router.navigate(['/dashboard']);
  }
}
