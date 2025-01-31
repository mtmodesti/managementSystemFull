import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateUnityComponent } from '../../components/create-unity/create-unity.component';
import { GetUnitsComponent } from '../../components/get-units/get-units.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'manage-unitys',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatTabsModule,
    MatIcon,
    MatFormFieldModule,
    GetUnitsComponent,
    CreateUnityComponent,
    MatInputModule,
  ],
  templateUrl: './manage-units.html',
  styleUrls: ['./manage-units.css'],
})
export class ManageUnits {
  activatedTab = 0;
  tabNames: string[] = [
    'Criar unidade',
    'Listar unidades',
    'Editar unidades',
    'Remover unidades',
  ];
  @Output() tabChanged = new EventEmitter<string>();

  @ViewChild('manageUnitsChild') manageUnitsChild?: GetUnitsComponent;

  constructor(private router: Router) {}

  onTabChange(index: number): void {
    const selectedTab = this.tabNames[index];
    this.tabChanged.emit(selectedTab);
    this.activatedTab = index;
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
