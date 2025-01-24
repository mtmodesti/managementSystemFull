import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUnitsComponent } from './delete-units.component';

describe('DeleteUnitsComponent', () => {
  let component: DeleteUnitsComponent;
  let fixture: ComponentFixture<DeleteUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteUnitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
