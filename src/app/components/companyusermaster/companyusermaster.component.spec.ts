import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyusermasterComponent } from './companyusermaster.component';

describe('CompanyusermasterComponent', () => {
  let component: CompanyusermasterComponent;
  let fixture: ComponentFixture<CompanyusermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyusermasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyusermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
