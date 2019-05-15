import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { Router } from "@angular/router";
import { AddUser } from "../actions/user.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  angForm: FormGroup;
  error: string;

  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private store: Store<State>,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  loginUser(email, password) {
    this.us.loginUser(email, password).subscribe(
      (res: any) => {
        console.log("addUser", res);
        if (res.user) {
          const { name, email, password } = res.user;
          this.store.dispatch(new AddUser({ name, email, password }));
          this.router.navigateByUrl("/");
        }
      },
      error => {
        this.error = error.error;
      }
    );
  }

  ngOnInit() {}
}
