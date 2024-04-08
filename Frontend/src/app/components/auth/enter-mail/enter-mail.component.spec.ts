import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterMailComponent } from './enter-mail.component';

describe('EnterMailComponent', () => {
  let component: EnterMailComponent;
  let fixture: ComponentFixture<EnterMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnterMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnterMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
