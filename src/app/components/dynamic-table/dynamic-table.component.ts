import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
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

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatTableModule,
    MatOption,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent {
  private originalTableData: any[] = [];
  @Input() displayedColumns: any[] = [];
  @Input() tableHeader: string = '';
  @Input() hasActions = true;
  @Input() selectColumns: any = {};
  @Input() tableDataSource: any[] = [];
  isEditing = false;
  changedDataAlert = false;
  optionsList = [{ name: 'option1' }, { name: 'option2' }];

  deleteRow(element: any): void {
    console.log('Linha deletada:', element);
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
        if (this.isObject(element[column]) && element[column + 'Options']) {
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
      return element[column].join(', ');
    } else {
      const output = element[column].name
        ? element[column].name
        : 'Dado nã encontrado';
      return output;
    }
  }

  isString(value: any): boolean {
    return typeof value === 'string';
  }

  isObject(value: any) {
    return typeof value === 'object';
  }

  onDataChange(element: any): void {
    console.log('1');
    this.changedDataAlert = true;
    element['dataEdited'] = true;
  }

  onDataChange2(element: any): void {
    console.log('2');

    this.changedDataAlert = true;
    element['dataEdited'] = true;
  }

  saveChanges(): void {
    const modifiedRows = this.tableDataSource.filter((el) => el.dataEdited);

    if (modifiedRows.length > 0) {
      console.log('Dados salvos:', modifiedRows);

      modifiedRows.forEach((el) => delete el.dataEdited);
    } else {
      console.log('Nenhuma alteração detectada.');
    }

    this.changedDataAlert = false;
  }

  handleColumnOptions(column: string, options: any[]) {
    this.tableDataSource.forEach((el) => {
      el[column + 'Options'] = options;
    });
  }
}
