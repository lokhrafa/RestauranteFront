import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/shared/item';
import { ItemService } from 'src/app/shared/item.service';
import { OrderItem } from 'src/app/shared/order-item';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  formData!: OrderItem;
  itemList!: Item[]
  isValid: boolean = true
  data: any

  constructor(
   public dialogRef: MatDialogRef<OrderItemsComponent>,
   private itemService: ItemService,
   private orderService: OrderService,  @Inject(MAT_DIALOG_DATA) data: any ) { 

      this.data = data
   }

  ngOnInit(): void {
     


    this.itemService.getItemList().subscribe(res => {
     this.itemList = res
    })
    if(this.data.orderItemIndex == null){
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        Price: 0,
        Quantity: 0,
        Total: 0

      } 
    } else {
      this.formData = Object.assign({}, this.orderService.OrderItem[this.data.orderItemIndex])
    } 


  }

   updatePrice(ctrl: any){
    if(ctrl.selectedIndex == 0){
      this.formData.Price = 0;
      this.formData.ItemName = '';
    } else{
      this.formData.Price = this.itemList[ctrl.selectedIndex - 1].price;
      this.formData.ItemName = this.itemList[ctrl.selectedIndex -  1].name;
    }
    this.updateTotal();
  }
  updateTotal() {
   this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2));
  }

  onSubmit(form: NgForm){

 

      if(this.validateForm(form.value)){

        if(this.data.orderItemIndex == null){
          this.orderService.OrderItem.push(form.value);
          
          this.dialogRef.close();

        } else {
          this.orderService.OrderItem[this.data.orderItemIndex] = form.value;
          this.dialogRef.close();
        } 
        
      } 
  } 
  validateForm(formData: OrderItem) {
    this.isValid = true;

    if(formData.ItemID == 0){
      this.isValid = false
    } else if(formData.Quantity == 0){
      this.isValid = false
    }
    return this.isValid;
  }

}
