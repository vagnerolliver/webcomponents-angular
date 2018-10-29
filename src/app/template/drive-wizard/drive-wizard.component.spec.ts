import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveWizardComponent } from './drive-wizard.component';

describe('DriveWizardComponent', () => {
  let component: DriveWizardComponent;
  let fixture: ComponentFixture<DriveWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
