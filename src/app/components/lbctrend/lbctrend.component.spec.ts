import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbctrendComponent } from './lbctrend.component';

describe('LbctrendComponent', () => {
  let component: LbctrendComponent;
  let fixture: ComponentFixture<LbctrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbctrendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LbctrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
