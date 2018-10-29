import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveFormBuilderComponent } from './drive-form-builder.component';

describe('DriveFormBuilderComponent', () => {
  let component: DriveFormBuilderComponent;
  let fixture: ComponentFixture<DriveFormBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveFormBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveFormBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
