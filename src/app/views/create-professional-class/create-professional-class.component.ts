import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-professional-class',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    //NgxMaskDirective,
    MatButtonModule,
  ],
  templateUrl: './create-professional-class.component.html',
  styleUrl: './create-professional-class.component.css',
})
export class CreateProfessionalClassComponent {
  constructor(private router: Router) {}

  onSubmit(userForm: any): void {}
  goToDashboard(userForm: any): void {
    userForm.reset();
    this.router.navigate(['/dashboard']);
  }
}
