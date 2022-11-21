import { OrderItem } from "./order-item";

export class Order {
    OrderID!: number | null;
    OrderNo!: string;
    CustomerID!: number;
    PMethod!: string;
    GTotal!: number;
    DeleteOrderItemIDs!: string
}


export interface BuscarOrder {
    order: Order
    orderDetails: OrderItem[]
}