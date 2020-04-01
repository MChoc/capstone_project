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
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';

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
    path: 'management/menu',
    component: ManageMenuComponent
  },
  {
    path: 'add/:id',
    component: AddItemComponent
  },
  {
    path: 'management/menu/category',
    component: CategoryComponent
  },
  {
    path: 'management/menu/item',
    component: ItemComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
