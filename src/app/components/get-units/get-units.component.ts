import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Services } from '../../services/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Utils } from '../../utils/utils';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DynamicTableComponent } from '../dynamic-table/dynamic-table.component';
import getUnitsTable from './units-table.json';

@Component({
  selector: 'app-get-units',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    DynamicTableComponent,
  ],
  templateUrl: './get-units.component.html',
  styleUrl: './get-units.component.css',
})
export class GetUnitsComponent implements AfterViewInit {
  @ViewChild('dynamicTableComponent')
  dynamicTableComponent!: DynamicTableComponent;
  unitsTable = getUnitsTable;
  servicesOptions: any[] = [];
  dynamicColumns = {
    service: 'name',
  };

  @Input() activeTab: number = 0;
  isEditable = false;
  units: any[] = [];
  private _selectedUnit: any = [];

  get selectedUnit(): any {
    return this._selectedUnit;
  }

  set selectedUnit(value: any) {
    if (this._selectedUnit !== value) {
      this._selectedUnit = value;
      if (this.dynamicTableComponent) {
        this.dynamicTableComponent.tableDataSource = [this._selectedUnit];
      }
    }
  }
  @Output() dataChanged = new EventEmitter<any[]>();
  constructor(private services: Services, private snackBar: MatSnackBar) {}

  onValueChange(element: any, column: string) {}

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab'] && changes['activeTab'].currentValue) {
      if (this.activeTab === 1) {
        this.handleGetUnits();
        this.handleGetServices();
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

  objectEntries(obj: any): { key: string; value: any }[] {
    return obj
      ? Object.entries(obj).map(([key, value]) => ({ key, value }))
      : [];
  }

  formatValue(value: any): string {
    return Array.isArray(value) ? value.join(', ') : value.toString();
  }

  removeUnit(id: string): void {}

  onTableDataChanged(updatedData: any[]) {
    this.selectedUnit = updatedData;
  }

  handleGetServices() {
    this.services
      .getServices()
      .then((res) => {
        this.servicesOptions = res;
      })
      .catch((err) => {
        this.servicesOptions = [];
        Utils.showToast(
          this.snackBar,
          'Erro ao buscar serviços. Contate o suporte'
        );
      });
  }

  enableSelectEmitter(event: boolean) {
    Utils.enableSelectForDynamicTable(
      this.dynamicTableComponent,
      'service',
      this.servicesOptions
    );
  }
}
