import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidencesMapComponent } from './incidences-map.component';

describe('IncidencesMapComponent', () => {
  let component: IncidencesMapComponent;
  let fixture: ComponentFixture<IncidencesMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidencesMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidencesMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
