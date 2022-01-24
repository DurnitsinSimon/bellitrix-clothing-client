import $api from "..";
import { Order } from "../../types/order";
import { CREATE_PAYMENT, CAPTURE_PAYMENT, CREATE_ORDER, FIND_ALL_ORDERS, FIND_ORDER_BY_ID } from "./CONSTANTS";

export async function createPayment(sumPaid: number) {
    return (await $api.get(CREATE_PAYMENT(sumPaid))).data;
}

export async function capturePayment(paymentId: string, sumPaid: number) {
    return (await $api.get(CAPTURE_PAYMENT(paymentId, sumPaid))).data;
}

export async function createOrder(orderData: Order) {
    return (await $api.post(CREATE_ORDER, orderData)).data;
}

export async function findAllOrders(): Promise<Order[]> {
    return (await $api.get(FIND_ALL_ORDERS)).data;
}

export async function findOrderById(id: string): Promise<Order> {
    return (await $api.get(FIND_ORDER_BY_ID(id))).data;
}