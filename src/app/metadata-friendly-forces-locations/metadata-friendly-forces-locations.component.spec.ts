import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataFriendlyForcesLocationsComponent } from './metadata-friendly-forces-locations.component';

describe('MetadataFriendlyForcesLocationsComponent', () => {
  let component: MetadataFriendlyForcesLocationsComponent;
  let fixture: ComponentFixture<MetadataFriendlyForcesLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetadataFriendlyForcesLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataFriendlyForcesLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
