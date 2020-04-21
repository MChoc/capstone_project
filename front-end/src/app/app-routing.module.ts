import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent} from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { WaiterHomeComponent } from './waiter-home/waiter-home.component';
import { KitchenHomeComponent } from './kitchen-home/kitchen-home.component';
import { ManagementHomeComponent } from './management-home/management-home.component';
import { RegisterComponent } from './register/register.component';
import { StaffComponent } from './staff/staff.component';
import { LogoutComponent } from './logout/logout.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ManageMenuComponent } from './manage-menu/manage-menu.component';
import { AddItemComponent } from './add-item/add-item.component';
import { ItemComponent } from './item/item.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CartComponent } from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
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
import { ManagerAlertsResolvedComponent } from './manager-alerts-resolved/manager-alerts-resolved.component';
import { ResolvedAssistanceComponent } from './resolved-assistance/resolved-assistance.component';
import { ResolvedOrdersComponent } from './resolved-orders/resolved-orders.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AnalyticsMenuComponent } from './analytics-menu/analytics-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'menu/:id',
    component: MenuCategoryComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'waiter',
    component: WaiterHomeComponent
  },
  {
    path: 'management',
    component: ManagementHomeComponent
  },
  {
    path: 'kitchen',
    component: KitchenHomeComponent
  },
  {
    path: 'management/analytics',
    component: AnalyticsComponent
  },
  {
    path: 'management/analytics/menu',
    component: AnalyticsMenuComponent
  },
  {
    path: 'management/alerts',
    component: ManagerAlertsComponent
  },
  {
    path: 'management/alerts/resolved',
    component: ManagerAlertsResolvedComponent
  },
  {
    path: 'management/alerts/assistance/:id',
    component: ManagerAlertsAssistanceComponent  },
  {
    path: 'management/alerts/orders/:id',
    component: ManagerAlertsOrdersComponent
  },
  {
    path: 'management/alerts/pickups/:id',
    component: ManagerAlertsPickupsComponent
  },
  {
    path: 'management/alerts/resolved/assistance/:id',
    component: ResolvedAssistanceComponent
  },
  {
    path: 'management/alerts/resolved/orders/:id',
    component: ResolvedOrdersComponent
  },
  {
    path: 'management/staff',
    component: StaffComponent
  },
  {
    path: 'management/staff/register',
    component: RegisterComponent
  },
  {
    path: 'management/staff/edit/:id',
    component: UserEditComponent
  },
  {
    path: 'management/menu',
    component: ManageMenuComponent
  },
  {
    path: 'menu/:id/add/:id',
    component: AddItemComponent
  },
  {
    path: 'management/menu/category/:id',
    component: CategoryManageComponent
  },
  {
    path: 'management/menu/category/:id/edit-category/:id',
    component: CategoryEditComponent
  },
  {
    path: 'management/menu/category/:id/add-item/:id',
    component: ItemComponent
  },
  {
    path: 'management/menu/category/:id/edit-item/:id',
    component: ItemEditComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent
  },
  {
    path: 'management/menu/category/:id/add-extra/:id',
    component: ExtraComponent
  },
  {
    path: 'management/menu/category/:id/edit-extra/:id',
    component: ExtraEditComponent
  },
  {
    path: 'order-details/:id',
    component: OrderSuccessComponent
  },
  {
    path: 'assistance',
    component: AssistanceComponent
  },
  {
    path: 'assistance/:id',
    component: AssistanceIdComponent
  },
  {
    path: 'waiter/request/:id',
    component: WaiterAssistanceComponent
  },
  {
    path: 'waiter/pickup/:id',
    component: WaiterOrderComponent
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
