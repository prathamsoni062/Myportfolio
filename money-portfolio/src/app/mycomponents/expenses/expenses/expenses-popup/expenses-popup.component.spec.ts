import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPopupComponent } from './expenses-popup.component';

describe('ExpensesPopupComponent', () => {
  let component: ExpensesPopupComponent;
  let fixture: ComponentFixture<ExpensesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
