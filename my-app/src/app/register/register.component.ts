import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../user.service";
import { Store } from "@ngrx/store";
import { State } from "../reducers";
import { AddUser } from "../actions/user.actions";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
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
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  addUser(name, email, password) {
    this.us.addUser(name, email, password).subscribe(
      res => {
        console.log("addUser", res);
        this.store.dispatch(new AddUser({ name, email, password }));
        this.router.navigateByUrl("/");
      },
      error => {
        this.error = error.error;
      }
    );
  }

  ngOnInit() {}
}
