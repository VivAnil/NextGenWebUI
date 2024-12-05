import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpbeneficiariesComponent } from './spbeneficiaries.component';

describe('SpbeneficiariesComponent', () => {
  let component: SpbeneficiariesComponent;
  let fixture: ComponentFixture<SpbeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpbeneficiariesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpbeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
