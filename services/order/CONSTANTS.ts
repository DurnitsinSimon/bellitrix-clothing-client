export const CREATE_PAYMENT = (sumPaid: number) => `/order?sumPaid=${sumPaid}`;
export const CAPTURE_PAYMENT = (paymentId: string, sumPaid: number) => `/order/capturePayment?paymentId=${paymentId}&sumPaid=${sumPaid}`;
export const CREATE_ORDER = '/order/createOrder';
export const FIND_ALL_ORDERS = '/order/findAllOrders';
export const FIND_ORDER_BY_ID = (id: string) => `/order/findOrderById?id=${id}`;
