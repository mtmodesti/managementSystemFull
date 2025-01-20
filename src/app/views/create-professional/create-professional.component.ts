import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-create-professional',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    NgxMaskDirective,
    MatButtonModule,
  ],
  templateUrl: './create-professional.component.html',
  styleUrl: './create-professional.component.css',
})
export class CreateProfessionalComponent {
  constructor(private router: Router) {}

  goToDashboard(userForm: any): void {
    userForm.reset();
    this.router.navigate(['/dashboard']);
  }

  onSubmit(userForm: any): void {
    console.log('Form Values:', userForm.value);
  }
}
