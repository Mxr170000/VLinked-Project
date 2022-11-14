import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFinderPg1Component } from './job-finder-pg1.component';

describe('JobFinderPg1Component', () => {
  let component: JobFinderPg1Component;
  let fixture: ComponentFixture<JobFinderPg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFinderPg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFinderPg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});