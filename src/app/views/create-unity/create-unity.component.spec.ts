import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUnityComponent } from './create-unity.component';

describe('CreateUnityComponent', () => {
  let component: CreateUnityComponent;
  let fixture: ComponentFixture<CreateUnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUnityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
