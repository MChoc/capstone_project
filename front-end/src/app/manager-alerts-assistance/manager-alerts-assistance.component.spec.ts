import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAlertsAssistanceComponent } from './manager-alerts-assistance.component';

describe('ManagerAlertsAssistanceComponent', () => {
  let component: ManagerAlertsAssistanceComponent;
  let fixture: ComponentFixture<ManagerAlertsAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAlertsAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAlertsAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
