import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericProgressBarComponent } from './generic-progress-bar.component';

describe('GenericProgressBarComponent', () => {
  let component: GenericProgressBarComponent;
  let fixture: ComponentFixture<GenericProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericProgressBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
