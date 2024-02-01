import { CustomersComponent } from './customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterComponent } from './register/register.component';
import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {
    path:"",
    component:FullComponent,
    canActivate: [AuthGuard],
    children: [
      {path:"", redirectTo:"/registerCustomer", pathMatch:"full"},
      {path:"users", component: UsersComponent},
      {path:"registerCustomer", component: RegisterCustomerComponent},
      {path:"updateCustomer/:id", component: RegisterCustomerComponent},
      {path:"registerUser", component: RegisterUserComponent},
      {path:"updateUser/:id", component: RegisterUserComponent},
      {path:"customers", component: CustomersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
