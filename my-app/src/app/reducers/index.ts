import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import * as fromUser from "./user.reducer";
import * as fromNotification from "./notification.reducer";

export interface State {
  user: fromUser.UserState;
  notification: fromNotification.NotifState;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  notification: fromNotification.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
