import { Component } from '@angular/core';
import { LoginBoxComponent } from '../../components/login-box/login-box.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [LoginBoxComponent, MatButtonModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
