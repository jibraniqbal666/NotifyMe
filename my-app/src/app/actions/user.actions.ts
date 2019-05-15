import { Action } from "@ngrx/store";

export enum UserActionTypes {
  Login = "[User] Login",
  Add = "[User] Add"
}

export class LoginUser implements Action {
  readonly type = UserActionTypes.Login;

  constructor(public payload: { email: string; password: string }) {}
}

export class AddUser implements Action {
  readonly type = UserActionTypes.Add;

  constructor(
    public payload: { name: string; email: string; password: string }
  ) {}
}

export type ActionUnion = LoginUser | AddUser;
