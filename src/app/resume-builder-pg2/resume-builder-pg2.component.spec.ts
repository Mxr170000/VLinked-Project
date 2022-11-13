import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderPg2Component } from './resume-builder-pg2.component';

describe('ResumeBuilderPg2Component', () => {
  let component: ResumeBuilderPg2Component;
  let fixture: ComponentFixture<ResumeBuilderPg2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderPg2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilderPg2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
