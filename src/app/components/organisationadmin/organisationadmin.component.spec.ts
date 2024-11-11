import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationadminComponent } from './organisationadmin.component';

describe('OrganisationadminComponent', () => {
  let component: OrganisationadminComponent;
  let fixture: ComponentFixture<OrganisationadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationadminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganisationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
