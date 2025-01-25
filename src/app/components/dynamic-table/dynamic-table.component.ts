import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
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
  displayedColumns: string[] = []; // Armazena as colunas dinâmicas

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
    console.log(`Valor atualizado na coluna "${column}":`, element[column]);
  }
}
