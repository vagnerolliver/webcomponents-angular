import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveAccordionComponent } from './drive-accordion.component';

describe('DriveAccordionComponent', () => {
  let component: DriveAccordionComponent;
  let fixture: ComponentFixture<DriveAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
