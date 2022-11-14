import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobFinderComponent } from './job-finder.component';

describe('JobFinderComponent', () => {
  let component: JobFinderComponent;
  let fixture: ComponentFixture<JobFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobFinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
