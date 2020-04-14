import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ɵNgSelectMultipleOption } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { WaiterHomeComponent } from './waiter-home/waiter-home.component';
import { ManagementHomeComponent } from './management-home/management-home.component';
import { KitchenHomeComponent } from './kitchen-home/kitchen-home.component';
import { RegisterComponent } from './register/register.component';
import { StaffComponent } from './staff/staff.component';
import { LogoutComponent } from './logout/logout.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { AddItemComponent } from './add-item/add-item.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CategoryManageComponent } from './category-manage/category-manage.component';
import { ExtraComponent } from './extra/extra.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ExtraEditComponent } from './extra-edit/extra-edit.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AssistanceComponent } from './assistance/assistance.component';
import { AssistanceIdComponent } from './assistance-id/assistance-id.component';
import { WaiterAssistanceComponent } from './waiter-assistance/waiter-assistance.component';
import { WaiterOrderComponent } from './waiter-order/waiter-order.component';
import { ManagerAlertsComponent } from './manager-alerts/manager-alerts.component';
import { ManagerAlertsAssistanceComponent } from './manager-alerts-assistance/manager-alerts-assistance.component';
import { ManagerAlertsOrdersComponent } from './manager-alerts-orders/manager-alerts-orders.component';
import { ManagerAlertsPickupsComponent } from './manager-alerts-pickups/manager-alerts-pickups.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    WaiterHomeComponent,
    ManagementHomeComponent,
    KitchenHomeComponent,
    RegisterComponent,
    StaffComponent,
    LogoutComponent,
    UserEditComponent,
    ManageMenuComponent,
    AddItemComponent,
    CategoryEditComponent,
    ItemComponent,
    ItemEditComponent,
    CartComponent,
    CheckoutComponent,
    CategoryManageComponent,
    ExtraComponent,
    PageNotFoundComponent,
    ExtraEditComponent,
    OrderSuccessComponent,
    AssistanceComponent,
    AssistanceIdComponent,
    WaiterAssistanceComponent,
    WaiterOrderComponent,
    ManagerAlertsComponent,
    ManagerAlertsAssistanceComponent,
    ManagerAlertsOrdersComponent,
    ManagerAlertsPickupsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
