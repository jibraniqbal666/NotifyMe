import { Component, OnInit } from "@angular/core";
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

@Component({
  selector: "app-notification-simulation",
  templateUrl: "./notification-simulation.component.html",
  styleUrls: ["./notification-simulation.component.css"]
})
export class NotificationSimulationComponent implements OnInit {
  angForm: FormGroup;
  error: string;
  kinds = [{ name: "info" }, { name: "warn" }, { name: "error" }];

  constructor(
    private fb: FormBuilder,
    private ns: NotificationService,
    private store: Store<State>,
    private router: Router
  ) {
    this.createForm();
  }

  type = new FormControl("", [Validators.required]);

  createForm() {
    this.angForm = this.fb.group({
      title: ["", Validators.required],
      body: ["", Validators.required],
      email: ["", Validators.required],
      type: this.type
    });
  }

  add(notification: Notification) {
    console.log(notification);
    this.ns.add(notification).subscribe(
      (res: any) => {
        console.log("notification sent", res);
        this.error = "notification sent";
      },
      error => {
        this.error = error.error;
      }
    );
  }

  ngOnInit() {}
}
