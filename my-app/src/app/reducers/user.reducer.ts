import { Action } from "@ngrx/store";
import { UserActionTypes, ActionUnion } from "../actions/user.actions";

export interface UserState {
  name: string;
  email: string;
}

export const initialState: UserState = {
  name: "",
  email: ""
};

export function reducer(state = initialState, action: ActionUnion): UserState {
  switch (action.type) {
    case UserActionTypes.Login:
      return { ...state, ...action.payload };
    case UserActionTypes.Add:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
