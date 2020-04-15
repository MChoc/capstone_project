import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAlertsResolvedComponent } from './manager-alerts-resolved.component';

describe('ManagerAlertsResolvedComponent', () => {
  let component: ManagerAlertsResolvedComponent;
  let fixture: ComponentFixture<ManagerAlertsResolvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAlertsResolvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAlertsResolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
