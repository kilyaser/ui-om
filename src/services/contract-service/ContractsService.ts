import {contractApi} from "../../clients/generated";
import {CreateContractRequest, UiContract, UiContracts} from "../../clients/generated/commonApi/models";


class ContractsService {

    async getContractsByCounterpartyId(id: string): Promise<UiContracts> {
        try {
            return await contractApi.getByCounterparty(id);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async createContract(req: CreateContractRequest): Promise<UiContract> {
        try {
            return await contractApi.createContract(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}

const contractsService = new ContractsService();

export default contractsService;