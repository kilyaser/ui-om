import {SearchRequest, type UiCounterparties} from "../../clients/generated/commonApi/models";
import {counterpartyApi} from "../../clients/generated";

class CounterpartyService {

    async searchCounterparty(req: SearchRequest): Promise<UiCounterparties> {
        try {
            return await counterpartyApi.searchCounterparty(req)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const counterpartyService = new CounterpartyService();

export default counterpartyService;