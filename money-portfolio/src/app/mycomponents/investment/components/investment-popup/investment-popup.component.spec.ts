import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentPopupComponent } from './investment-popup.component';

describe('InvestmentPopupComponent', () => {
  let component: InvestmentPopupComponent;
  let fixture: ComponentFixture<InvestmentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvestmentPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvestmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
