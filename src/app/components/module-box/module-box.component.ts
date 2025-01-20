import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-module-box',
  imports: [MatIconModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './module-box.component.html',
  styleUrl: './module-box.component.css',
})
export class ModuleBoxComponent {
  @Input() module: any = null;

  constructor(private router: Router) {}

  handleClick(menu: any) {
    const menuUrl = `/${menu.url}`;
    this.router.navigate([menuUrl]);
  }
}
