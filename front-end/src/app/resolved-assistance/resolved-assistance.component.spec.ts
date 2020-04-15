import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedAssistanceComponent } from './resolved-assistance.component';

describe('ResolvedAssistanceComponent', () => {
  let component: ResolvedAssistanceComponent;
  let fixture: ComponentFixture<ResolvedAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
