import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationService } from "../notification.service";
import { State } from "../reducers";
import { Store, select } from "@ngrx/store";
import { getPopUpNotifications } from "../selectors/notification.selector";
import { DeleteRealNotification } from "../actions/notification.actions";

@Component({
  selector: "app-popup-notification-list",
  templateUrl: "./popup-notification-list.component.html",
  styleUrls: ["./popup-notification-list.component.css"]
})
export class PopupNotificationListComponent implements OnInit {
  // notifications = Array.from(Array(5).keys()).map(() => {
  //   return {
  //     title: "Title",
  //     body: "body",
  //     kind: "info",
  //     email: "linux@gmail.com"
  //   };
  // });

  notifications = [];
  notifications$: Observable<{}>;

  constructor(private ns: NotificationService, private store: Store<State>) {
    this.notifications$ = this.store.pipe(select(getPopUpNotifications));
  }

  onClosePress($event) {
    this.notificationChild = $event;
    console.log($event);
    this.store.dispatch(new DeleteRealNotification($event));
  }

  notificationChild: Notification;

  ngOnInit() {
    //observe data from redux
    this.notifications$.subscribe((notifications: Array<Notification>) => {
      this.notifications = notifications;
    });
  }
}
