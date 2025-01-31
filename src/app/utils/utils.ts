import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicTableComponent } from '../components/dynamic-table/dynamic-table.component';

export class Utils {
  // constructor(private snackBar: MatSnackBar) {}
  static showToast(snackBar: MatSnackBar, message: string): void {
    snackBar.open(message, 'Fechar', {
      duration: 3000,

      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }

  // static enableSelectForDynamicTable(
  //   table: DynamicTableComponent,
  //   column: string,
  //   options: any[]
  // ) {
  //   table.tableDataSource = table.tableDataSource.map((el) => {
  //     el[`${column}Select`] = true;
  //     el[`${column}SelectOptions`] = options;
  //     // Certifique-se de que `el[column]` seja o objeto completo correspondente a uma das opções
  //     el[column] =
  //       options.find((option) => option.id === el[column]?.id) || null;
  //     return el;
  //   });
  // }
}
