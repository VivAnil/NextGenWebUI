import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LBCReportComponent } from './lbcreport.component';

describe('LBCReportComponent', () => {
  let component: LBCReportComponent;
  let fixture: ComponentFixture<LBCReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LBCReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LBCReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
