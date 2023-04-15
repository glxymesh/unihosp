import { TestBed } from '@angular/core/testing';

import { CreaterpofileGuard } from './createrpofile.guard';

describe('CreaterpofileGuard', () => {
  let guard: CreaterpofileGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreaterpofileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
