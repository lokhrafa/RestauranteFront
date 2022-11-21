import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuscarOrder, Order } from './order';
import { OrderItem } from './order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

   formData!: Order
   OrderItem!: OrderItem[]

  constructor(private http: HttpClient) { 

   
  }

  saveOrUpdateOrder(){

    console.log(this.OrderItem);

    var body = {

     OrderID: this.formData.OrderID,
     OrderNo: this.formData.OrderNo,
     CustomerID: this.formData.CustomerID,
     PMethod: this.formData.PMethod,
     GTotal: this.formData.GTotal,
     DeleteOrderItemIDs: this.formData.DeleteOrderItemIDs,
     OrderItems: [{"OrderItemID": "0","OrderID":0, "ItemID":"1", "Quantity": 1 }]
     /*  ...this.formData,
      OrderItems: this.OrderItem */
    };

    return this.http.post(environment.apiURL + '/Order', body);
  }

  getOrderList(): Observable<Order>{
    return this.http.get<Order>(environment.apiURL + '/Order')
  }

 getOrderByID(id:number): Observable<BuscarOrder>{

  return this.http.get<BuscarOrder>(environment.apiURL + '/Order/' + id)

  }

  deleteOrder(id: number) {

    return this.http.delete(environment.apiURL + '/Order/' + id);


  }
}
