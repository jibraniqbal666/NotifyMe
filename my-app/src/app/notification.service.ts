import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import Notification from "./models/notification";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  uri = "http://localhost:4000/notification";

  constructor(private http: HttpClient) {}

  getNotifications(email) {
    return this.http.get(`${this.uri}/${email}`);
  }

  delete(id) {
    return this.http.get(`${this.uri}/delete/${id}`);
  }

  update(notification: Notification) {
    return this.http.post(
      `${this.uri}/update/${notification._id}`,
      notification
    );
  }

  add(notification: Notification) {
    return this.http.post(`${this.uri}/add`, notification);
  }
}
