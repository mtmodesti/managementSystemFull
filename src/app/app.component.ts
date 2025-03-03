import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import menuTreeData from '../assets/configs/sidenavTreeData.json';
import dashboardModules from '../assets/configs/modules.json';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatIconModule,
    FormsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatButtonModule,
    MatIcon,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  dataSource = menuTreeData.sidenav;
  childrenAccessor = (node: any) => node.children ?? [];
  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;
  modules: any[] = [];

  opened: boolean = false;

  constructor(private router: Router) {
    this.modules = this.handleLoadModules();
  }

  handleLoadModules() {
    return dashboardModules.dashboard.modules;
  }

  toggleSidenavMenu() {
    this.opened = !this.opened;
  }

  navigate(url: string) {
    this.router.navigate([`/${url}`]);
    this.opened = false;
  }

  getRoute() {
    if (this.router.url === '/') {
      this.opened = false;
    }
    return this.router.url !== '/';
  }
}
