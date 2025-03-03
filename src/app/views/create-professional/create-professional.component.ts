import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Services } from '../../services/services';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-professional',
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    DynamicTableComponent,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './create-professional.component.html',
  styleUrl: './create-professional.component.css',
})
export class CreateProfessionalComponent implements OnInit {
  @ViewChild('dynamicTableComponent')
  dynamicTableComponent!: DynamicTableComponent;
  professionalsList: any[] = [];
  unitsList: any[] = [];
  usersList: any[] = [];
  selectColumns = {
    profession: [],
    units: [],
  };
  columnTitle = {
    active: 'Ativo',
    cpf: 'CPF',
    email: 'E-mail',
    id: 'Identificador',
    name: 'Nome',
    professionalId: 'Regstro Profissional',
    profession: 'Profissão',
    units: 'Unidade(s) de atendimento',
  };
  multiSelectColumns = ['units'];

  checkboxState: any = {
    active: true,
    cpf: true,
    email: true,
    id: true,
    name: true,
    professionalId: true,
    profession: true,
    units: true,
  };

  constructor(private services: Services, private router: Router) {}

  goToDashboard(userForm: any): void {
    userForm.reset();
    this.router.navigate(['/dashboard']);
  }

  onSubmit(userForm: any): any {
    this.services.createUser(userForm.value);
  }

  async ngOnInit(): Promise<any> {
    this.professionalsList = await this.services.getProfessionalClasses();
    this.unitsList = await this.services.getUnits();
  }

  deleteEmitter(event: any) {
    this.services.disableProfessional(event.id).then(async () => {
      await this.updateTableData();
    });
  }

  editedRowsEmitter(event: any) {
    this.services.updateProfessionals(event).then(async () => {
      await this.updateTableData();
    });
  }

  async selectedTabChange(event: any) {
    if (event.index === 1) {
      await this.updateTableData();
    }
  }

  async updateTableData() {
    this.professionalsList = await this.services.getProfessionalClasses();
    this.unitsList = (await this.services.getUnits()).map((unit: any) => ({
      ...unit,
      name: unit.unitName,
    }));

    this.usersList = await (
      await this.services.getUsers()
    ).filter((el: any) => !!el.profession === true);
    this.dynamicTableComponent.updateTableDataSource(this.usersList);
    this.dynamicTableComponent.handleColumnOptions(
      'profession',
      this.professionalsList
    );
    this.dynamicTableComponent.handleColumnOptions('units', this.unitsList);
    this.dynamicTableComponent.selectColumns['units'] = this.unitsList;
    this.dynamicTableComponent.selectColumns['profession'] = this.unitsList;
    this.dynamicTableComponent.isEditing = false;
  }
}
