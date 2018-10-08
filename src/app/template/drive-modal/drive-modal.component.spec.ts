import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveModalComponent } from './drive-modal.component';

describe('DriveModalComponent', () => {
  let component: DriveModalComponent;
  let fixture: ComponentFixture<DriveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
