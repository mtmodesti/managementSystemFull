import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatTableModule,
    MatOption,
    MatSlideToggleModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatCheckbox,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent {
  //Inputs
  @Input() displayedColumns: any[] = [];
  @Input() tableHeader: string = '';
  @Input() hasActions = true;
  @Input() selectColumns: any = {};
  @Input() tableDataSource: any[] = [];
  @Input() multiSelectColumns: string[] = [];
  @Input() columnTitle: any = {};
  @Input() checkboxColumns: any = [];
  @Input() checkboxState: any = {};
  @Input() columnVisibilityState: { [key: string]: boolean } = {};
  @Input() disabledColumn: string = 'disbledColumn';

  //Outputs
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() editedRowsEmitter: EventEmitter<any> = new EventEmitter<any>();

  //Viewchilds
  @ViewChildren('checkboxViewChild') checkboxViewChild:
    | QueryList<MatCheckbox>
    | undefined;

  //Variables
  isEditing = false;
  changedDataAlert = false;

  deleteRow(element: any): void {
    this.deleteEmitter.emit(element);
  }

  toggleEdition(): void {
    this.isEditing = !this.isEditing;

    if (this.isEditing) {
      this.syncSelectedOptions();
    }
  }

  syncSelectedOptions() {
    this.tableDataSource.forEach((element) => {
      this.displayedColumns.forEach((column) => {
        if (Array.isArray(element[column])) {
          const optionsIds = element[column].map((el: any) => el.id);
          element[column] = this.selectColumns[column].filter((el: any) =>
            optionsIds.includes(el.id)
          );
        } else if (
          typeof element[column] === 'object' &&
          element[column].constructor === Object
        ) {
          element[column] =
            element[column + 'Options'].find(
              (option: any) => option.id === element[column].id
            ) || element[column];
        }
      });
    });
  }

  updateTableDataSource(newData: any[]) {
    this.tableDataSource = newData;
  }

  handleText(element: any, column: any) {
    if (typeof element[column] === 'string') {
      return element[column];
    } else if (Array.isArray(element[column])) {
      return 'array';
    } else if (typeof element[column] === 'boolean') {
      return this.isBoolean(element, column);
    } else {
      const output = element[column]?.name
        ? element[column].name
        : 'Dado nã encontrado';
      return output;
    }
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  isObject(value: any) {
    return typeof value === 'object' || typeof value === 'boolean';
  }

  onDataChange(element: any): void {
    this.changedDataAlert = true;
    element['dataEdited'] = true;
  }

  saveChanges(): void {
    const modifiedRows = this.tableDataSource.filter((el) => el.dataEdited);

    if (modifiedRows.length > 0) {
      modifiedRows.forEach((el) => delete el.dataEdited);
      this.editedRowsEmitter.emit(modifiedRows);
    }
    this.changedDataAlert = false;
  }

  handleColumnOptions(column: string, options: any[]) {
    this.tableDataSource.forEach((el) => {
      el[column + 'Options'] = options;
    });
  }

  isMultiSelect(column: string): boolean {
    return this.multiSelectColumns?.includes(column);
  }

  ngOnInit() {
    // Filtro inicial para exibir apenas as colunas com o valor true no checkboxState
    this.displayedColumns = Object.keys(this.checkboxState).filter(
      (column) => this.checkboxState[column] === true
    );
  }

  toggleColumnVisibility(column: string) {
    const columnIndex = this.displayedColumns.indexOf(column);
    if (columnIndex !== -1) {
      this.displayedColumns.splice(columnIndex, 1); // Remove a coluna
    } else {
      this.displayedColumns.push(column); // Adiciona a coluna
      this.displayedColumns.sort((a, b) => a.localeCompare(b)); // Ordena alfabeticamente
    }
    console.log(this.displayedColumns);
  }

  checkboxesOptions() {
    return Object.keys(this.checkboxState);
  }

  handleMultiSelectOptions(element: any, column: any) {
    const availableOptions = element[column + 'Options'].map(
      (el: any) => el.id
    );
    const currentValue = element[column].filter((el: any) =>
      availableOptions.includes(el.id)
    );
    return currentValue.map((el: any) => el.unitName).join(', ');
  }

  isBoolean(element: any, column: any) {
    return element[column] ? 'Sim' : 'Não';
  }

  isBooleanType(element: any, column: any) {
    return typeof element[column] === 'boolean';
  }
}
