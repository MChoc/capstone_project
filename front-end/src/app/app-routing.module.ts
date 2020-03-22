import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent} from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { WaiterHomeComponent } from './waiter-home/waiter-home.component';
import { KitchenHomeComponent } from './kitchen-home/kitchen-home.component';
import { ManagementHomeComponent } from './management-home/management-home.component';
import { RegisterComponent } from './register/register.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'login',
    component: LoginComponent
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
    path: 'management/staff',
    component: StaffComponent
  },
  {
    path: 'management/staff/register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
