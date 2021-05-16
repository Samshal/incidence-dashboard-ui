import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesByRegionBreakdownComponent } from './incidences-by-region-breakdown.component';

describe('IncidencesByRegionBreakdownComponent', () => {
  let component: IncidencesByRegionBreakdownComponent;
  let fixture: ComponentFixture<IncidencesByRegionBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesByRegionBreakdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesByRegionBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
