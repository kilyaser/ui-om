import {paymentApi} from "../../clients/generated";
import {type CreatePaymentRequest, UiPayment} from "../../clients/generated/commonApi/models";

class PaymentService {

    async addPayment(req: CreatePaymentRequest): Promise<UiPayment> {
        try {
            return await paymentApi.addPayment(req);
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async deletePayment(id: string) {
        try {
            await paymentApi.deletePayment(id);
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

const paymentService = new PaymentService();

export default paymentService;