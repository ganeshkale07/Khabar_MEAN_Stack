import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeFormComponent } from './personalize-form.component';

describe('PersonalizeFormComponent', () => {
  let component: PersonalizeFormComponent;
  let fixture: ComponentFixture<PersonalizeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalizeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
