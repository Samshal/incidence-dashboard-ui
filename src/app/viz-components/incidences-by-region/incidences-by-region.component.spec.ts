import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesByRegionComponent } from './incidences-by-region.component';

describe('IncidencesByRegionComponent', () => {
  let component: IncidencesByRegionComponent;
  let fixture: ComponentFixture<IncidencesByRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesByRegionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesByRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
