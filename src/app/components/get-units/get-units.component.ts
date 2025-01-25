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

  @Input() activeTab: number = 0;
  isEditable = false;
  units: any[] = [];
  private _selectedUnit: any = [];

  get selectedUnit(): any {
    return this._selectedUnit;
  }

  set selectedUnit(value: any) {
    if (this._selectedUnit !== value) {
      // Agora, ao invés de passar um único objeto, passamos o mesmo objeto duas vezes
      this._selectedUnit = value;
      console.log(this._selectedUnit);

      // Passando o objeto selecionado duas vezes para o DynamicTableComponent
      if (this.dynamicTableComponent) {
        this.dynamicTableComponent.tableDataSource = [this._selectedUnit];
        console.log(this.dynamicTableComponent.tableDataSource);
      }
    }
  }
  @Output() dataChanged = new EventEmitter<any[]>();
  constructor(private services: Services, private snackBar: MatSnackBar) {}

  onValueChange(element: any, column: string) {
    console.log('Valor alterado:', element, column, element[column]);
    // this.dataChanged.emit(this.tableDataSource); // Envia os dados alterados de volta para o componente pai
  }

  ngAfterViewInit(): void {
    console.log('A View foi inicializada');
  }

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

  objectEntries(obj: any): { key: string; value: any }[] {
    return obj
      ? Object.entries(obj).map(([key, value]) => ({ key, value }))
      : [];
  }

  formatValue(value: any): string {
    return Array.isArray(value) ? value.join(', ') : value.toString();
  }

  removeUnit(id: string): void {
    console.log(`Deletar a unidade de ID ${id}`);
  }

  onTableDataChanged(updatedData: any[]) {
    console.log('Dados atualizados:', updatedData);
    this.selectedUnit = updatedData; // Atualiza a unidade selecionada com os dados modificados
  }
}
