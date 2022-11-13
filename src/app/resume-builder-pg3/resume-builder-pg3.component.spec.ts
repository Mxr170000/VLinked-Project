import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderPg3Component } from './resume-builder-pg3.component';

describe('ResumeBuilderPg3Component', () => {
  let component: ResumeBuilderPg3Component;
  let fixture: ComponentFixture<ResumeBuilderPg3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderPg3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilderPg3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
