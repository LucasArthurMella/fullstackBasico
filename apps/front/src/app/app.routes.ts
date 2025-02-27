import { Routes } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {path:"login", component: LoginComponent},
  {
    path: "",
    canActivate:[AuthGuard],
    children: [
      {path: "products", component: ProductsComponent},
      {path: "orders", component:OrdersComponent},
      {path: "login", component: LoginComponent}
    ],
    runGuardsAndResolvers: 'always' //
  }
];
