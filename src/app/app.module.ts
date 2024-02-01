import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DemoFlexyModule } from './demo-flexy-module';
import { FullComponent } from './layouts/full/full.component';

// Modules
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AuthInterceptorService } from './auth-interceptor.service';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterComponent } from './register/register.component';
import { DialogCustomersComponent } from './customers/dialog-customers/dialog-customers.component';
import { CustomersComponent } from './customers/customers.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    RegisterCustomerComponent,
    CustomersComponent,
    DialogCustomersComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    DemoFlexyModule,
    NgApexchartsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
