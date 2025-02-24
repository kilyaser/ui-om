
import {taskApi} from "../../clients/generated";
import {
    CreateTaskRequest,
    TaskCompletedRequest,
    UiTask,
    UpdateTaskRequest
} from "../../clients/generated/commonApi/models";

class TaskService {

    async addTask(req: CreateTaskRequest): Promise<UiTask> {
        try {
            return await taskApi.addTask(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateTask(req: UpdateTaskRequest): Promise<UiTask> {
        try {
            return await taskApi.updateTask(req);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async completeTask(req: TaskCompletedRequest): Promise<UiTask> {
        try {
            return await taskApi.complectedTask(req)
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteTask(taskId: string){
        try {
            await taskApi.deleteTask(taskId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTaskByOrderId(orderId: string){
        try {
            return await taskApi.getTasksByOrderId(orderId);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const taskService = new TaskService();

export default taskService;