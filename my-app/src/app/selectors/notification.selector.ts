import { createSelector } from "@ngrx/store";
import { State } from "../reducers";

export const selectNotificationState = (state: State) =>
  state.notification.notifications;

export const getNotifications = createSelector(
  selectNotificationState,
  notifications => notifications
);

export const selectPopupNotificationState = (state: State) =>
  state.notification.popup_notifications;

export const getPopUpNotifications = createSelector(
  selectPopupNotificationState,
  popup_notifications => popup_notifications
);
