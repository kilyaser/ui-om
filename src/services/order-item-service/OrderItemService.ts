import {ordersItemApi} from "../../clients/generated";
import {
    AddOrderItemsRequest,
    DeleteOrderItemRequest, OrderItemFieldsPatch, UiEstablishMachineRequest, UiOrderItem,
    type UiOrderItems, UpdateOrderItemRequest,
} from "../../clients/generated/commonApi/models";


class OrderItemService {

    async addItems(req: AddOrderItemsRequest): Promise<UiOrderItems> {
        try {
            return await ordersItemApi.addOrderItems(req);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteItems(req: DeleteOrderItemRequest) {
        try {
            await ordersItemApi.deleteOrderItems(req);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateOrderItems(patch: OrderItemFieldsPatch, orderId: string) {
        try {
            const req: UpdateOrderItemRequest = {
                orderId: orderId,
                patch: [patch],
            }
            return await ordersItemApi.updateOrderItems(req);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async establishMachines(req: UiEstablishMachineRequest) {
        try {
            return await ordersItemApi.establishMachines(req);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getItemById(id: string): Promise<UiOrderItem> {
        try {
            return await ordersItemApi.findById(id)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const orderItemService = new OrderItemService();

export default orderItemService;