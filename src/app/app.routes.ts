import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateUnityComponent } from './views/create-unity/create-unity.component';
import { CreateProfessionalClassComponent } from './views/create-professional-class/create-professional-class.component';
import { CreateProfessionalComponent } from './views/create-professional/create-professional.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'unity', component: CreateUnityComponent },
  { path: 'class', component: CreateProfessionalClassComponent },
  { path: 'professional', component: CreateProfessionalComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
