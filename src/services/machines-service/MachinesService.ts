
import {machineApi} from "../../clients/generated";
import type {CreateMachineRequest, UiMachines} from "../../clients/generated/commonApi/models";


class MachineService {

    async findAllMachines(): Promise<UiMachines> {
        try {
            return await machineApi.getAllMachines();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async crateMachine(req: CreateMachineRequest) {
        try {
            return await machineApi.createMachine(req);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getOccupiedMachineByItemId(id: string): Promise<UiMachines> {
        try {
            return await machineApi.getByOrderItemId(id);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

const machineService = new MachineService();

export default machineService;