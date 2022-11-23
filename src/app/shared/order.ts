import { OrderItem } from "./order-item";

export class Order {
    orderID!: number | null;
    orderNo!: string;
    customerID!: number;
    pMethod!: string;
    gTotal!: number;
    deleteOrderItemIDs!: string
}


export interface BuscarOrder {
    order: Order
    orderDetails: OrderItem[]
}