import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ModuleBoxComponent } from '../../components/module-box/module-box.component';
import dashboardModules from '../../../assets/configs/modules.json';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, ModuleBoxComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  modules: any[] = [];

  constructor() {
    this.modules = dashboardModules.dashboard.modules;
  }
}
