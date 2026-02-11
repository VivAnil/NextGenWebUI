import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LbcbaComponent } from './lbcba.component';

describe('LbcbaComponent', () => {
  let component: LbcbaComponent;
  let fixture: ComponentFixture<LbcbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LbcbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LbcbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
