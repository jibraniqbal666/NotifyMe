import { Component, OnInit } from "@angular/core";
import Notification from "../models/notification";
import { Store, select } from "@ngrx/store";
import { State } from "../reducers";
import { getUser } from "../selectors/user.selector";
import { getNotifications } from "../selectors/notification.selector";
import { Router } from "@angular/router";
import User from "../models/user";
import { Observable } from "rxjs";
import io from "socket.io-client";
import {
  LoadNotifications,
  LoadRealNotifications
} from "../actions/notification.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  user$: Observable<{}>;
  notifications$: Observable<{}>;
  userParent: User;
  socket: any;
  closeResult: string;
  constructor(
    private store: Store<State>,
    private router: Router,
  ) {
    this.user$ = this.store.pipe(select(getUser));

    this.notifications$ = this.store.pipe(select(getNotifications));
    this.user$.subscribe((user: User) => {
      console.log("user", user);
      this.userParent = user;
      if (!user.email) this.router.navigateByUrl("/auth");
      else {
        //connect with server
        this.socket = io.connect(`http://localhost:3000`, {
          query: `user=${user.email}`
        });
        this.socket.on("connect", function() {
          console.log("connected");
        });
        this.socket.on("added", data => {
          console.log("added", data);
          this.addedNotification(data);
        });
        this.socket.on("disconnect", function() {
          console.log("disconnected");
        });
      }
    });
  }

  addedNotification = data => {
    this.store.dispatch(new LoadRealNotifications([data]));
  };


  ngOnInit() {}
}
