import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsearchScreenComponent } from './jobsearch-screen.component';

describe('JobsearchScreenComponent', () => {
  let component: JobsearchScreenComponent;
  let fixture: ComponentFixture<JobsearchScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsearchScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsearchScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
