import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyKnkoComponent } from './buy-knko.component';

describe('BuyKnkoComponent', () => {
  let component: BuyKnkoComponent;
  let fixture: ComponentFixture<BuyKnkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyKnkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyKnkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
