import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonedropdownComponent } from './phonedropdown.component';

describe('PhonedropdownComponent', () => {
  let component: PhonedropdownComponent;
  let fixture: ComponentFixture<PhonedropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonedropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonedropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
