import {
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
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatOption,
    MatTableModule,
    MatSelect,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent implements OnInit {
  @Input() tableDataSource: any[] = []; // Dados da tabela
  @Input() dynamicColumns: any = {}; // Dados da tabela

  displayedColumns: string[] = []; // Armazena as colunas dinâmicas
  isEditing: boolean = false;
  @Output() enableSelectEmitter = new EventEmitter<boolean>();
  @ViewChild('matSelectViewChild', { static: false })
  matSelectViewChild!: MatSelect;

  ngOnInit() {
    // Se houver dados no array tableDataSource
    if (this.tableDataSource.length > 0) {
      // Identifica as chaves do primeiro objeto como as colunas da tabela
      this.displayedColumns = Object.keys(this.tableDataSource[0]);
    }
  }

  ngOnChanges() {
    if (this.tableDataSource.length > 0) {
      // Atualiza as colunas caso os dados mudem
      this.displayedColumns = Object.keys(this.tableDataSource[0]).sort(
        (a, b) => a.localeCompare(b)
      );
    }
  }

  // Método para lidar com alterações nas células
  onCellValueChange(element: any, column: string) {
    console.log('a');
  }

  handleOpenEdition() {
    this.tableDataSource = this.tableDataSource.map((el) => {
      const updatedEl = { ...el }; // Cria uma nova cópia do objeto
      Object.keys(updatedEl).forEach((key) => {
        // Ignora a coluna 'id'
        if (key === 'id') {
          return;
        }
        // Adiciona ou atualiza a chave editable
        const editableKey = `${key}Editable`;
        updatedEl[editableKey] = true;
      });
      return updatedEl; // Retorna o objeto atualizado
    });
  }
  handleBlockEdition() {
    this.tableDataSource = this.tableDataSource.map((el) => {
      const updatedEl = { ...el }; // Cria uma nova cópia do objeto
      Object.keys(updatedEl).forEach((key) => {
        // Ignora a coluna 'id'
        if (key === 'id') {
          return;
        }
        // Adiciona ou atualiza a chave editable
        const editableKey = `${key}Editable`;
        updatedEl[editableKey] = false;
      });
      return updatedEl; // Retorna o objeto atualizado
    });
  }

  enableSelectForColumn() {
    this.enableSelectEmitter.emit(true);
  }
  toggleEdition() {
    this.isEditing = !this.isEditing;

    this.tableDataSource = this.tableDataSource.map((el) => {
      const updatedEl = { ...el };
      Object.keys(updatedEl).forEach((key) => {
        if (key === 'id') {
          return;
        }
        const editableKey = `${key}Editable`;
        updatedEl[editableKey] = this.isEditing;
      });
      return updatedEl;
    });
    this.enableSelectForColumn();
  }

  handleButtonEdit() {}

  validateFields(): boolean {
    let isValid = true;

    this.tableDataSource.forEach((row) => {
      this.displayedColumns.forEach((column) => {
        if (row[column + 'Editable'] && !row[column]) {
          isValid = false;
        }
      });
    });

    return isValid;
  }

  formatReadOnlyText(element: any, column: any) {
    if (typeof element[column] === 'string') {
      return element[column];
    } else if (Array.isArray(element[column])) {
      return 'array ';
    } else {
      return element[column][this.dynamicColumns[column]]; // element[this.dynamicColumns]['column']['labelShow'];
    }
  }

  formatOptionLabelShow(option: any) {
    return option.name;
  }
}
