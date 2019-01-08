import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KPointsComponent } from './k-points.component';

describe('WithdrawComponent', () => {
  let component: KPointsComponent;
  let fixture: ComponentFixture<KPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
