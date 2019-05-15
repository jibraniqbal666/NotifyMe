import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  uri = "http://localhost:4000/user";

  constructor(private http: HttpClient) {}

  addUser(name, email, password) {
    const obj = {
      name,
      email,
      password
    };
    console.log(obj);
    return this.http.post(`${this.uri}/add`, obj);
  }

  loginUser(email, password) {
    const obj = {
      email,
      password
    };
    console.log(obj);
    return this.http.post(`${this.uri}/login`, obj);
  }
}
