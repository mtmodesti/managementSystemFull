import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ModuleBoxComponent } from '../../components/module-box/module-box.component';
import dashboardModules from '../../../assets/configs/modules.json';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatIcon,
    ModuleBoxComponent,
    CommonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  modules: any[] = [];

  constructor(private router: Router) {
    this.modules = this.handleLoadModules();
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }

  // Função que carrega módulos do dashboard de acordo com o perfil
  // alterar para true || false a chave visible de acordo com o perfil
  handleLoadModules() {
    return dashboardModules.dashboard.modules;
  }
}
