import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsAssistanceComponent } from './analytics-assistance.component';

describe('AnalyticsAssistanceComponent', () => {
  let component: AnalyticsAssistanceComponent;
  let fixture: ComponentFixture<AnalyticsAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
