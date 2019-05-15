import { Component, OnInit, Input, SimpleChange } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { UserService } from "../user.service";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { Router } from "@angular/router";
import { AddUser } from "../actions/user.actions";
import Notification from "../models/notification";
import { NotificationService } from "../notification.service";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { EditNotification } from "../actions/notification.actions";
import { Subject } from "rxjs";

@Component({
  selector: "app-edit-notification-modal",
  templateUrl: "./edit-notification-modal.component.html",
  styleUrls: ["./edit-notification-modal.component.css"]
})
export class EditNotificationModalComponent implements OnInit {
  angForm: FormGroup;
  error: string;
  kinds = [{ name: "info" }, { name: "warn" }, { name: "error" }];

  _notificationParent = null;

  @Input("notificationParent")
  set notificationParent(value: Notification) {
    this._notificationParent = value;
    this.createForm(value);
  }

  constructor(
    private fb: FormBuilder,
    private ns: NotificationService,
    private store: Store<State>,
    private router: Router,
    public activeModal: NgbActiveModal
  ) {}

  type = new FormControl("", [Validators.required]);

  createForm(notification) {
    this.angForm = this.fb.group({
      title: [notification.title, Validators.required],
      body: [notification.body, Validators.required],
      type: this.type
    });
  }

  edit(notification: Notification) {
    const newNotification = {
      ...this._notificationParent,
      ...{
        title: notification.title,
        body: notification.body,
        kind: notification.kind
      }
    };
    console.log(newNotification);
    this.store.dispatch(new EditNotification(newNotification));
    this.ns.update(newNotification).subscribe(
      (res: any) => {
        console.log("notification sent", res);
        this.error = "notification sent";
      },
      error => {
        console.log(error);
        this.error = error.error.text;
      }
    );
  }

  ngOnInit() {}
}
