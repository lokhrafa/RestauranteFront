import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderList: any;

  constructor(private service: OrderService,
    private router: Router, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.refreshList();
  }
  refreshList() {
    this.service.getOrderList().subscribe(res => {
         this.orderList = res;
    })
    
  }

  openForEdit(orderID: number){

    this.router.navigate(['/order/edit/' + orderID]);
      
  }

  onOrderDelete(id: number){
    if(confirm('Are you sure to delete this record?')){

      this.service.deleteOrder(id).subscribe(res => {

        this.refreshList();
        this.toastr.warning("Delete Succesfully", "Restaurante App");
      })
    }
  }

}
