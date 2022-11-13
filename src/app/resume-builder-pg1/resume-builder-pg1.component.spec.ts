import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderPg1Component } from './resume-builder-pg1.component';

describe('ResumeBuilderPg1Component', () => {
  let component: ResumeBuilderPg1Component;
  let fixture: ComponentFixture<ResumeBuilderPg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderPg1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilderPg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
