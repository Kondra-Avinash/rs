import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignReward } from './assign-reward';

describe('AssignReward', () => {
  let component: AssignReward;
  let fixture: ComponentFixture<AssignReward>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignReward]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignReward);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
