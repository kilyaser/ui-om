import {ordersItemApi} from "../../clients/generated";
import {
    AddOrderItemsRequest,
    DeleteOrderItemRequest,
    type UiOrderItems
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

}

const orderItemService = new OrderItemService();

export default orderItemService;