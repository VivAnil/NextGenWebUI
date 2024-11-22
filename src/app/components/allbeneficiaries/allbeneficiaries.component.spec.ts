import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllbeneficiariesComponent } from './allbeneficiaries.component';

describe('AllbeneficiariesComponent', () => {
  let component: AllbeneficiariesComponent;
  let fixture: ComponentFixture<AllbeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllbeneficiariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllbeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
