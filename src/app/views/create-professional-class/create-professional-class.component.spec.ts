import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfessionalClassComponent } from './create-professional-class.component';

describe('CreateProfessionalClassComponent', () => {
  let component: CreateProfessionalClassComponent;
  let fixture: ComponentFixture<CreateProfessionalClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProfessionalClassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProfessionalClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
