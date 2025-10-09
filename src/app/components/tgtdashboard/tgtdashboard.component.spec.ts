import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TgtdashboardComponent } from './tgtdashboard.component';

describe('TgtdashboardComponent', () => {
  let component: TgtdashboardComponent;
  let fixture: ComponentFixture<TgtdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TgtdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TgtdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
