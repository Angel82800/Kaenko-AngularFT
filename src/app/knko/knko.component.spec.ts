import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnkoComponent } from './knko.component';

describe('WithdrawComponent', () => {
  let component: KnkoComponent;
  let fixture: ComponentFixture<KnkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
