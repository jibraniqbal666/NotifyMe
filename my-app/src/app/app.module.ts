import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule, ActionReducer, MetaReducer } from "@ngrx/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { NotificationItemComponent } from "./notification-item/notification-item.component";
import { NotificationListComponent } from "./notification-list/notification-list.component";
import { reducers, State } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AuthComponent } from "./auth/auth.component";
import { localStorageSync } from "ngrx-store-localstorage";
import { PopupNotificationComponent } from "./popup-notification/popup-notification.component";
import { PopupNotificationListComponent } from "./popup-notification-list/popup-notification-list.component";
import { NotificationSimulationComponent } from "./notification-simulation/notification-simulation.component";
import { EditNotificationModalComponent } from "./edit-notification-modal/edit-notification-modal.component";

const metaReducers: MetaReducer<State>[] = [localStorageSyncReducer];
export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ["user"], rehydrate: true })(reducer);
}

const routes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "auth", component: AuthComponent },
  { path: "demo", component: NotificationSimulationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotificationItemComponent,
    NotificationListComponent,
    AuthComponent,
    PopupNotificationComponent,
    PopupNotificationListComponent,
    NotificationSimulationComponent,
    EditNotificationModalComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [EditNotificationModalComponent]
})
export class AppModule {}
