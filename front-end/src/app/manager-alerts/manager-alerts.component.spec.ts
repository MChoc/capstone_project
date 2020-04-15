import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAlertsComponent } from './manager-alerts.component';

describe('ManagerAlertsComponent', () => {
  let component: ManagerAlertsComponent;
  let fixture: ComponentFixture<ManagerAlertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAlertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
