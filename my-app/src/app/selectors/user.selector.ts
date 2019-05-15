import { createSelector } from "@ngrx/store";
import { State } from "../reducers";
export const selectUserState = (state: State) => state.user;
export const getUser = createSelector(
  selectUserState,
  user => user
);
