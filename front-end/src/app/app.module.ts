import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { LogoutComponent } from './logout/logout.component';


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
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    TokenInterceptorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
