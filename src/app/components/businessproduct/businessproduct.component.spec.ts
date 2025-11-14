import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessproductComponent } from './businessproduct.component';

describe('BusinessproductComponent', () => {
  let component: BusinessproductComponent;
  let fixture: ComponentFixture<BusinessproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessproductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
