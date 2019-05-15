import { Component, OnInit, Input } from "@angular/core";
import { NotificationService } from "../notification.service";
import User from "../models/user";
import { Store, select } from "@ngrx/store";
import { State } from "../reducers";
import {
  LoadNotifications,
  DeleteNotification
} from "../actions/notification.actions";
import Notification from "../models/notification";
import { Observable } from "rxjs";
import { getNotifications } from "../selectors/notification.selector";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { CompileSummaryKind } from "@angular/compiler";
import { EditNotificationModalComponent } from "../edit-notification-modal/edit-notification-modal.component";

@Component({
  selector: "app-notification-list",
  templateUrl: "./notification-list.component.html",
  styleUrls: ["./notification-list.component.css"]
})
export class NotificationListComponent implements OnInit {
  // notifications = Array.from(Array(10).keys()).map(() => {
  //   return {
  //     title: "Title",
  //     body: "body",
  //     kind: "info",
  //     email: "linux@gmail.com"
  //   };
  // });

  notifications = [];
  notifications$: Observable<{}>;

  constructor(
    private ns: NotificationService,
    private store: Store<State>,
    private modalService: NgbModal
  ) {
    this.notifications$ = this.store.pipe(select(getNotifications));
  }

  notificationChild: Notification;
  @Input() userChild: User;

  onEditPress($event) {
    this.notificationChild = $event;
    console.log($event);
    this.open();
  }

  onDeletePress($event) {
    this.notificationChild = $event;
    console.log($event);
    this.store.dispatch(new DeleteNotification($event));
  }

  getNotificationsByEmail() {
    this.ns.getNotifications(this.userChild.email).subscribe(
      (notifications: Array<Notification>) => {
        this.store.dispatch(new LoadNotifications(notifications));
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
    this.getNotificationsByEmail();

    //observe data from redux
    this.notifications$.subscribe((notifications: Array<Notification>) => {
      this.notifications = notifications;
    });
  }

  //modal code
  open() {
    const modalRef = this.modalService.open(EditNotificationModalComponent);
    modalRef.componentInstance.notificationParent = this.notificationChild
  }
}
