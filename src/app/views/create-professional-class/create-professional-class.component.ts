import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Services } from '../../services/services';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicTableComponent } from '../../components/dynamic-table/dynamic-table.component';

@Component({
  selector: 'app-create-professional-class',
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatButtonModule,
    DynamicTableComponent,
  ],
  templateUrl: './create-professional-class.component.html',
  styleUrl: './create-professional-class.component.css',
})
export class CreateProfessionalClassComponent {
  @ViewChild('dynamicTableComponent')
  dynamicTableComponent!: DynamicTableComponent;
  professionalClasses: any[] = [];
  columnTitle = {
    id: 'Identificador',
    name: ' Nome',
  };
  checkboxState: any = {
    id: true,
    name: true,
  };

  constructor(private router: Router, private services: Services) {}

  onSubmit(userForm: any): void {
    const className = userForm.value.className;
    this.services.createProfessionalClass(className);
  }

  goToDashboard(userForm: any): void {
    userForm.reset();
    this.router.navigate(['/dashboard']);
  }

  async onTabChange(event: any) {
    if (event === 1) {
      this.professionalClasses = await this.services.getProfessionalClasses();
      this.dynamicTableComponent.updateTableDataSource(
        this.professionalClasses
      );
    }
  }

  async deleteRow(event: any) {
    const isDeleted = await this.services.deleteProfessionalClass(event.id);

    if (isDeleted) {
      this.professionalClasses = await this.services.getProfessionalClasses();
      this.dynamicTableComponent.updateTableDataSource(
        this.professionalClasses
      );
    }
  }

  async editedRowsEmitter(event: any) {
    await this.services.updateProfessionalClasses(event);
  }
}
