import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { Services } from '../../services/services';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Utils } from '../../utils/utils';
import { RxjsService } from '../../services/rxjs-services';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login-box',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: './login-box.component.html',
  styleUrl: './login-box.component.css',
})
export class LoginBoxComponent {
  constructor(
    private router: Router,
    private services: Services,
    private snackBar: MatSnackBar,
    private rxjsService: RxjsService,
    private dialog: MatDialog
  ) {}
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  handleLogin() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    const isDefault = password === 'default';

    const user = { email, password };

    this.services
      .login(user.email || '', user.password || '')
      .then((user) => {
        if (user) {
          this.rxjsService.setUser(user);

          if (isDefault) {
            // Abrir modal para troca de senha
            const dialogRef = this.dialog.open(ChangePasswordComponent, {
              width: '400px',
              disableClose: true, // Impede fechar sem definir nova senha
            });

            dialogRef.afterClosed().subscribe((newPassword) => {
              if (newPassword) {
                this.services
                  .updatePassword(user.email, newPassword)
                  .then(() => {
                    this.router.navigate(['/dashboard']);
                  });
              }
            });
          } else {
            this.router.navigate(['/dashboard']);
            Utils.showToast(this.snackBar, 'Login realizado com sucesso!');
          }
        } else {
          Utils.showToast(
            this.snackBar,
            'Usuário não encontrado. Confira as credenciais ou entre em contato com o suporte.'
          );
        }
      })
      .catch(() => {
        Utils.showToast(this.snackBar, 'Erro ao fazer login!');
      });
  }

  handleLoginButton(): boolean {
    return !(this.passwordFormControl.valid && this.emailFormControl.valid);
  }
}
