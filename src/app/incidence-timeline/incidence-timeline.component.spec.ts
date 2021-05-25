import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceTimelineComponent } from './incidence-timeline.component';

describe('IncidenceTimelineComponent', () => {
  let component: IncidenceTimelineComponent;
  let fixture: ComponentFixture<IncidenceTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
