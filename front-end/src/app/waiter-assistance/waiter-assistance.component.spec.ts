import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterAssistanceComponent } from './waiter-assistance.component';

describe('WaiterAssistanceComponent', () => {
  let component: WaiterAssistanceComponent;
  let fixture: ComponentFixture<WaiterAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaiterAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaiterAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
