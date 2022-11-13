import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeBuilderPg4Component } from './resume-builder-pg4.component';

describe('ResumeBuilderPg4Component', () => {
  let component: ResumeBuilderPg4Component;
  let fixture: ComponentFixture<ResumeBuilderPg4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeBuilderPg4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeBuilderPg4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
