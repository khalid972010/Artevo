import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireFreelancerComponent } from './hire-freelancer.component';

describe('HireFreelancerComponent', () => {
  let component: HireFreelancerComponent;
  let fixture: ComponentFixture<HireFreelancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireFreelancerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HireFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
