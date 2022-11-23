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



    let Ordenes: any[] = [];

    let myorder: any = {}

    var result = this.OrderItem.map(item =>({
       
        orderItemID:  item.orderItemID,
        OrderID: item.orderID,
        Quantity:  item.quantity,
        ItemID:  item.itemID

      

    }))

     
   

    var body = {

     OrderID: this.formData.orderID,
     OrderNo: this.formData.orderNo,
     CustomerID: this.formData.customerID,
     PMethod: this.formData.pMethod,
     GTotal: this.formData.gTotal,
     DeleteOrderItemIDs: this.formData.deleteOrderItemIDs, 
     OrderItems: result
  
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
