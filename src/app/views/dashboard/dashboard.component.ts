import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ModuleBoxComponent } from '../../components/module-box/module-box.component';

@Component({
  selector: 'app-dashboard',
  imports: [MatIconModule, ModuleBoxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
