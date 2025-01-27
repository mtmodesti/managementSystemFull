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

  static enableSelectForDynamicTable(
    table: DynamicTableComponent,
    column: string,
    options: any[]
  ) {
    table.tableDataSource = table.tableDataSource.map((el) => {
      el[`${column}Select`] = true;
      el[`${column}SelectOptions`] = options;
      console.log(el);
      console.log(column);
      setTimeout(() => {}, 10);
      return el;
    });
  }
}
