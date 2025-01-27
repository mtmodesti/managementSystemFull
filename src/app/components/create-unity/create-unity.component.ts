import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Services } from '../../services/services';
import { Utils } from '../../utils/utils';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective } from 'ngx-mask';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-create-unity',
  imports: [
    CommonModule,
    MatSelect,
    MatOption,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
  ],
  templateUrl: './create-unity.component.html',
  styleUrl: './create-unity.component.css',
})
export class CreateUnityComponent {
  servicesOptions: any = [];
  @Input() activeTab: number = 0;
  serviceValue = null;

  constructor(private services: Services, private snackBar: MatSnackBar) {}
  onSubmit(userForm: any): void {
    this.createUnity(userForm.value);
  }

  createUnity(data: any) {
    this.services
      .createUnity(data)
      .then((res) => {
        if (res) {
          Utils.showToast(this.snackBar, 'Unidade criada com sucesso!');
        } else {
          Utils.showToast(
            this.snackBar,
            'Já existe uma unidade com esse e-mail registrado!'
          );
        }
      })
      .catch((err) => {
        Utils.showToast(
          this.snackBar,
          'Erro ao riar unidade. COntate o suporte !'
        );
      });
  }

  handleGetServices() {
    this.services
      .getServices()
      .then((res) => {
        this.servicesOptions = res;
      })
      .catch((err) => {
        this.servicesOptions = [];
        Utils.showToast(
          this.snackBar,
          'Erro ao buscar serviços. Contate o suporte'
        );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeTab'] && changes['activeTab'].currentValue === 0) {
      this.handleGetServices();
    }
  }
}
