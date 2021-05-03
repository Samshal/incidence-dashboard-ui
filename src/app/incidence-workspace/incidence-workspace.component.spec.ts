import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenceWorkspaceComponent } from './incidence-workspace.component';

describe('IncidenceWorkspaceComponent', () => {
  let component: IncidenceWorkspaceComponent;
  let fixture: ComponentFixture<IncidenceWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidenceWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidenceWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
