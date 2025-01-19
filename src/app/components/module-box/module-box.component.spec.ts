import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleBoxComponent } from './module-box.component';

describe('ModuleBoxComponent', () => {
  let component: ModuleBoxComponent;
  let fixture: ComponentFixture<ModuleBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
