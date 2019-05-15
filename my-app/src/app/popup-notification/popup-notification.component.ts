import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import Notification from "../models/notification";
import { TouchSequence } from "selenium-webdriver";

@Component({
  selector: "app-popup-notification",
  templateUrl: "./popup-notification.component.html",
  styleUrls: ["./popup-notification.component.css"]
})
export class PopupNotificationComponent implements OnInit {
  @Input() notificationChild: Notification;
  @Output() onClose = new EventEmitter<Notification>();
  show = false;
  constructor() {
    setTimeout(() => {
      if (this.notificationChild.kind == "info") this.onClosePress();
    }, 10000);
  }
  onClosePress() {
    this.onClose.emit(this.notificationChild);
  }
  ngOnInit() {}
}
