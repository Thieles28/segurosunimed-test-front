import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCustomersComponent } from './dialog-customers.component';

describe('DialogCustomersComponent', () => {
  let component: DialogCustomersComponent;
  let fixture: ComponentFixture<DialogCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCustomersComponent]
    });
    fixture = TestBed.createComponent(DialogCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
