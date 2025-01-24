import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ManageUnits } from './views/create-unity/manage-units';
import { CreateProfessionalClassComponent } from './views/create-professional-class/create-professional-class.component';
import { CreateProfessionalComponent } from './views/create-professional/create-professional.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'unity', component: ManageUnits },
  { path: 'class', component: CreateProfessionalClassComponent },
  { path: 'professional', component: CreateProfessionalComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
