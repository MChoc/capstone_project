import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAlertsPickupsComponent } from './manager-alerts-pickups.component';

describe('ManagerAlertsPickupsComponent', () => {
  let component: ManagerAlertsPickupsComponent;
  let fixture: ComponentFixture<ManagerAlertsPickupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerAlertsPickupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerAlertsPickupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
