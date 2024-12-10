import {PageRequest, type PageUiOrderShort} from "../../clients/generated/commonApi/models";
import {ordersApi} from "../../clients/generated";

class OrderService {

    async getOrderPage(req: PageRequest): Promise<PageUiOrderShort> {
        try {
            return await ordersApi.getOrdersPage(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const orderService = new OrderService();

export default orderService;