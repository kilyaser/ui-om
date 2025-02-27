import {
    type CreateOrderRequest,
    PageRequest, type PageUiOrder,
    type PageUiOrderShort,
    type UiOrder
} from "../../clients/generated/commonApi/models";
import {ordersApi} from "../../clients/generated";


class OrderService {

    async getOrdersPage(req: PageRequest): Promise<PageUiOrderShort> {
        try {
            return await ordersApi.getOrdersPage(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getOrderById(id: string): Promise<UiOrder> {
        try {
            return await ordersApi.getOrderById(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createOrder(req: CreateOrderRequest): Promise<UiOrder> {
        try {
            return await ordersApi.createOrder(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getAllOrdersByCounterparty(counterpartyId: string, pageRequest: PageRequest): Promise<PageUiOrder> {
        try {
            return await ordersApi.getAllOrdersByCounterparty(counterpartyId, pageRequest);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const orderService = new OrderService();

export default orderService;