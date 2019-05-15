import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import Notification from "../models/notification";

@Component({
  selector: "app-notification-item",
  templateUrl: "./notification-item.component.html",
  styleUrls: ["./notification-item.component.css"]
})
export class NotificationItemComponent implements OnInit {
  @Input() notificationChild: Notification;
  @Output() onDelete = new EventEmitter<Notification>();
  @Output() onEdit = new EventEmitter<Notification>();
  constructor() {}

  onDeletePress() {
    this.onDelete.emit(this.notificationChild);
  }
  onEditPress() {
    this.onEdit.emit(this.notificationChild);
  }
  ngOnInit() {}
}
