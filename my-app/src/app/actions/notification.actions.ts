import { Action } from "@ngrx/store";
import Notification from "../models/notification";
export enum NotificationActionTypes {
  LoadNotifications = "[Notification] Load Notifications",
  LoadRealNotifications = "[Notification] Load Real Notifications",
  DeleteNotification = "[Notification] Delete Notification",
  DeleteRealNotification = "[Notification] Delete Real Notification",
  EditNotifications = "[Notification] Edit Notifications"
}

export class LoadNotifications implements Action {
  readonly type = NotificationActionTypes.LoadNotifications;
  constructor(public payload: Array<Notification>) {}
}

export class LoadRealNotifications implements Action {
  readonly type = NotificationActionTypes.LoadRealNotifications;
  constructor(public payload: Array<Notification>) {}
}

export class DeleteRealNotification implements Action {
  readonly type = NotificationActionTypes.DeleteRealNotification;
  constructor(public payload: Notification) {}
}

export class EditNotification implements Action {
  readonly type = NotificationActionTypes.EditNotifications;
  constructor(public payload: Notification) {}
}

export class DeleteNotification implements Action {
  readonly type = NotificationActionTypes.DeleteNotification;
  constructor(public payload: Notification) {}
}

export type ActionUnion =
  | LoadNotifications
  | DeleteNotification
  | EditNotification
  | LoadRealNotifications
  | DeleteRealNotification;
