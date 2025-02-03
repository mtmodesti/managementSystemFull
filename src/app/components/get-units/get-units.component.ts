import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-get-units',
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    CommonModule,
    DynamicTableComponent,
  ],
  templateUrl: './get-units.component.html',
  styleUrl: './get-units.component.css',
})
export class GetUnitsComponent {
  @ViewChild('dynamicTableComponent')
  dynamicTableComponent!: DynamicTableComponent;
  unitsTable = getUnitsTable;
  servicesOptions: any[] = [];
  dynamicColumns = {
    service: 'name',
  };
  columnTitle = {
    address: 'Endereço',
    cep: 'Cep',
    email: 'E-mail',
    id: 'Identificador',
    phone: 'Telefone',
    responsible: 'Responsável',
    service: 'Tipo de serviço',
    unitName: 'Nome da unidade',
  };
  checkboxState: any = {
    address: true,
    cep: false,
    email: false,
    id: true,
    phone: false,
    responsible: false,
    service: false,
    unitName: false,
  };

  @Input() activeTab: number = 0;
  isEditable = false;
  units: any[] = [];
  private _selectedUnit: any = [];

  get selectedUnit(): any {
    return this._selectedUnit;
  }

  selectColumns = {
    service: [],
  };

  @Output() dataChanged = new EventEmitter<any[]>();
  constructor(
    private services: Services,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

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
        this.dynamicTableComponent.updateTableDataSource(res);
      })
      .catch((err) => {
        this.units = [];
        Utils.showToast(
          this.snackBar,
          'Erro ao buscar unidades. Contate o suporte'
        );
      });
  }

  handleGetServices() {
    this.services
      .getServices()
      .then((res) => {
        this.servicesOptions = res;
        this.dynamicTableComponent.handleColumnOptions('service', res);
      })
      .catch((err) => {
        this.servicesOptions = [];
        Utils.showToast(
          this.snackBar,
          'Erro ao buscar serviços. Contate o suporte'
        );
      });
  }

  deleteEmitter(event: any) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: {
        unit: event,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.services.deleteUnit(result.unit.id);
        Utils.showToast(this.snackBar, 'Unidade removida com sucesso!');
        this.handleGetUnits();
      }
    });
  }

  async editedRowsEmitter(event: any[]) {
    console.log(event);

    const result = await this.services.updateUnits(event);

    if (result) {
      Utils.showToast(this.snackBar, 'Unidade(s) atualizadas com sucesso!');
      this.dynamicTableComponent.isEditing = false;
    }
  }
}
