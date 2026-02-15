import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardList } from './reward-list';

describe('RewardList', () => {
  let component: RewardList;
  let fixture: ComponentFixture<RewardList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RewardList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
