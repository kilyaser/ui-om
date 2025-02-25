import {
    PageRequest, type PageUiCounterparty,
    SearchRequest,
    type UiCounterparties, UiCounterparty
} from "../../clients/generated/commonApi/models";
import {counterpartyApi} from "../../clients/generated";

class CounterpartyService {

    async searchCounterparty(req: SearchRequest): Promise<UiCounterparties> {
        try {
            return await counterpartyApi.searchCounterparty(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCounterparties(req: PageRequest): Promise<PageUiCounterparty> {
        try {
            return await counterpartyApi.getCounterpartyPage(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCounterpartyById(id: string): Promise<UiCounterparty> {
        try {
            return await counterpartyApi.getCounterparty(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const counterpartyService = new CounterpartyService();

export default counterpartyService;