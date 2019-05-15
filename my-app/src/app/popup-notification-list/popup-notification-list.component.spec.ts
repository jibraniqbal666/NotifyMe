import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupNotificationListComponent } from './popup-notification-list.component';

describe('PopupNotificationListComponent', () => {
  let component: PopupNotificationListComponent;
  let fixture: ComponentFixture<PopupNotificationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNotificationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
