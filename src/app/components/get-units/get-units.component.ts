import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Services } from '../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-get-units',
  imports: [MatFormFieldModule, MatSelectModule, CommonModule],
  templateUrl: './get-units.component.html',
  styleUrl: './get-units.component.css',
})
export class GetUnitsComponent {
  @Input() activeTab: number = 0;

  units: any[] = ['Unidade 1', 'Unidade 2', 'Unidade 3'];
  selectedUnit: any = null; // Unidade selecionada

  constructor(private services: Services, private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab'] && changes['activeTab'].currentValue) {
      if (this.activeTab === 1) {
        this.handleGetUnits();
      }
    }
  }

  handleGetUnits() {
    this.services
      .getUnits()
      .then((res) => {
        this.units = res;
      })
      .catch((err) => {
        this.units = [];
        Utils.showToast(
          this.snackBar,
          'Erro ao buscar unidades. Contate o suporte'
        );
      });
  }
}
