import { MatSnackBar } from '@angular/material/snack-bar';

export class Utils {
  // constructor(private snackBar: MatSnackBar) {}
  static showToast(snackBar: MatSnackBar, message: string): void {
    snackBar.open(message, 'Fechar', {
      duration: 3000,

      horizontalPosition: 'start',
      verticalPosition: 'top',
    });
  }
}
