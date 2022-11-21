
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/shared/customer';
import { CustomerService } from 'src/app/shared/customer.service';
import { OrderService } from 'src/app/shared/order.service';
import { OrderItemsComponent } from '../order-items/order-items.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  customerList$!: Observable<any[]>;

  colorSet = ["Red", "Blue", "Green","yellow"];
  
  isValid: boolean = true;
  

  constructor(public service: OrderService,
    private dialog: MatDialog, private customerService:
    CustomerService,private toastr: ToastrService,
    private router: Router, private currentRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.customerList$ = this.customerService.getCustomerList();


    let orderID = this.currentRoute.snapshot.paramMap.get('id');

    if(orderID == null){
      this.resetForm();
    } else {
      this.service.getOrderByID(parseInt(orderID)).subscribe((v) => {
        this.service.formData = v.order
        this.service.OrderItem = v.orderDetails
      });

      }
      

       
      
    }
  resetForm(form?: NgForm ) {
      
    
    if(form?.value == null || undefined){
       form?.resetForm();
    }

    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: '',
      GTotal: 0,
      DeleteOrderItemIDs: ''
    }
    this.service.OrderItem = [];
  }
 
  AddOrEditOrderItem(orderItemIndex: any, OrderID: any){
   

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose  = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {orderItemIndex, OrderID};
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe({
      next: () => this.updateGrandTotal()
    })

  }
  updateGrandTotal() {
   this.service.formData.GTotal = this.service.OrderItem.reduce((prev, curr) => {
    
    return prev + curr.Total;
   }, 0)

   this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }

  validateForm(){

    this.isValid = true

    if(this.service.formData.OrderID == null){
         this.service.formData.OrderID = 0
    }

   if(this.service.OrderItem.length == 0){
      this.isValid = false;

    }

    return this.isValid;

  }

  onSubmit(form: NgForm){
    
    console.log(this.service.formData);
    /* console.log(this.service.OrderItem) */

    if(this.validateForm()){

      

      this.service.saveOrUpdateOrder().subscribe(() => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Restaurante App');
        this.router.navigate(['/orders']);

      })
    }
  }

  onDeleteOrderItem(orderItemID: number | null, i: number){
    if(orderItemID != null){
      this.service.formData.DeleteOrderItemIDs += orderItemID + ",";
      this.service.OrderItem.splice(i, 1);
      this.updateGrandTotal();
    }

  }
   
  }


