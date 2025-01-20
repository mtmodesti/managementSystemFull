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
    this.modules = dashboardModules.dashboard.modules;
  }

  goToLogin(): void {
    this.router.navigate(['/']);
  }
}
