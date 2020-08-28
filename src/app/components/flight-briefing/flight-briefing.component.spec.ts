import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBriefingComponent } from './flight-briefing.component';

describe('FlightBriefingComponent', () => {
  let component: FlightBriefingComponent;
  let fixture: ComponentFixture<FlightBriefingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightBriefingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightBriefingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
