import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedOrdersComponent } from './resolved-orders.component';

describe('ResolvedOrdersComponent', () => {
  let component: ResolvedOrdersComponent;
  let fixture: ComponentFixture<ResolvedOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
