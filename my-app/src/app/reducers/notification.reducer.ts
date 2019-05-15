import { Action } from "@ngrx/store";
import {
  LoadNotifications,
  LoadRealNotifications,
  DeleteRealNotification,
  NotificationActionTypes,
  ActionUnion
} from "../actions/notification.actions";
import Notification from "../models/notification";

export interface NotifState {
  notifications: Array<Notification>;
  popup_notifications: Array<Notification>;
}

export const initialState: NotifState = {
  notifications: [],
  popup_notifications: []
};

export function reducer(state = initialState, action: ActionUnion): NotifState {
  switch (action.type) {
    case NotificationActionTypes.LoadNotifications:
      console.log(action.payload);
      return {
        notifications: [...action.payload, ...state.notifications],
        popup_notifications: state.popup_notifications
      };
    case NotificationActionTypes.LoadRealNotifications:
      console.log(action.payload);
      return {
        notifications: [...action.payload, ...state.notifications],
        popup_notifications: [...action.payload, ...state.popup_notifications]
      };
    case NotificationActionTypes.DeleteNotification:
      return {
        notifications: state.notifications.filter(
          (notification: Notification) =>
            notification._id !== action.payload._id
        ),
        popup_notifications: state.popup_notifications
      };
    case NotificationActionTypes.DeleteRealNotification:
      return {
        popup_notifications: state.popup_notifications.filter(
          (notification: Notification) =>
            notification._id !== action.payload._id
        ),
        notifications: state.notifications
      };
    case NotificationActionTypes.EditNotifications:
      return {
        notifications: state.notifications.map((notification: Notification) => {
          const payload: Notification = action.payload;
          if (payload._id !== notification._id) return notification;
          else return payload;
        }),
        popup_notifications: state.popup_notifications
      };
    default:
      return state;
  }
}
