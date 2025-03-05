import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMaskComponent } from './input-mask.component';

describe('InputMaskComponent', () => {
  let component: InputMaskComponent;
  let fixture: ComponentFixture<InputMaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
