import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './orders/order/order.component';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [
  {path:'', redirectTo:'order', pathMatch:'full'},
   {path:'orders', component:OrdersComponent},
   {path: 'order', component: OrderComponent, children:[{path:'edit/:id', component:OrderComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
