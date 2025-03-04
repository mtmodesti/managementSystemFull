import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import menuTreeDataAdmin from '../assets/configs/sidenavTreeData.json';
import menuTreeDataProfessional from '../assets/configs/sidenavTreeDataProfessional.json';

import dashboardModules from '../assets/configs/modules.json';
import { RxjsService } from './services/rxjs-services';
import { Subscription } from 'rxjs';

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
export class AppComponent implements OnInit {
  private subscription!: Subscription;

  dataSource: any = null;

  childrenAccessor = (node: any) => node.children ?? [];
  hasChild = (_: number, node: any) =>
    !!node.children && node.children.length > 0;
  modules: any[] = [];

  opened: boolean = false;

  constructor(private router: Router, private rxjsService: RxjsService) {
    this.modules = this.handleLoadModules();
  }

  ngOnInit() {
    this.subscription = this.rxjsService.loogedUserSubject$.subscribe(
      (loggedUser: any) => {
        this.handleSidenavMenu();
      }
    );
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

  getRoute(): any {
    if (this.router.url === '/') {
      this.opened = false;
    } else {
      this.handleSidenavMenu();
      return this.router.url !== '/';
    }
  }

  disableVisibility(node: any) {
    if (node.name === 'Administrativo') {
      return sessionStorage.getItem('user') === 'admin';
    } else {
      return true;
    }
  }
  handleSidenavMenu() {
    this.dataSource =
      sessionStorage.getItem('user') === 'admin'
        ? menuTreeDataAdmin.sidenav
        : menuTreeDataProfessional.sidenav;
  }
}
