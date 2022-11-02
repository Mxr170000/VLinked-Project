import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountScreenComponent } from './create-account-screen.component';

describe('CreateAccountScreenComponent', () => {
  let component: CreateAccountScreenComponent;
  let fixture: ComponentFixture<CreateAccountScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAccountScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAccountScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
