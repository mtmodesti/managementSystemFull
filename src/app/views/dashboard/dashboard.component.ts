import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleBoxComponent } from '../../components/module-box/module-box.component';
import dashboardModules from '../../../assets/configs/modules.json';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import menuTreeData from '../../../assets/configs/sidenavTreeData.json';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatIconModule,
    FormsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private router: Router) {}

  navigate(url: string) {
    this.router.navigate([`/${url}`]);
  }
}
