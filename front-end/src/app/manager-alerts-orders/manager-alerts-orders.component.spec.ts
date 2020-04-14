import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAlertsOrdersComponent } from './manager-alerts-orders.component';

describe('ManagerAlertsOrdersComponent', () => {
  let component: ManagerAlertsOrdersComponent;
  let fixture: ComponentFixture<ManagerAlertsOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAlertsOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAlertsOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
