import {
    type ChangeStateParams, ChangeStateToState,
    type CreateOrderRequest,
    PageRequest, type PageUiOrder,
    type PageUiOrderShort,
    type UiOrder, UiOrderAvailableStateAction, UiOrderConstraint
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

    async getAvailableOrderStates(orderId: string): Promise<UiOrderAvailableStateAction> {
        try {
            return await ordersApi.getAvailableAction(orderId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async changeState(orderId: string, state: keyof typeof ChangeStateToState) {

        try {
            const param: ChangeStateParams = {
                toState: ChangeStateToState[state]
            };
            console.log("changeState", orderId, param);
            return await ordersApi.changeState(orderId, param);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getConstraints(id: string): Promise<UiOrderConstraint> {
        try {
            return await ordersApi.getConstraints(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const orderService = new OrderService();

export default orderService;