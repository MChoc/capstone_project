import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistanceIdComponent } from './assistance-id.component';

describe('AssistanceIdComponent', () => {
  let component: AssistanceIdComponent;
  let fixture: ComponentFixture<AssistanceIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistanceIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistanceIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
