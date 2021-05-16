import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesByStateComponent } from './incidences-by-state.component';

describe('IncidencesByStateComponent', () => {
  let component: IncidencesByStateComponent;
  let fixture: ComponentFixture<IncidencesByStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesByStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesByStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
