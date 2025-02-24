
import {useTranslation} from "react-i18next";
import {Button, TextField} from "@mui/material";
import {CreateTaskRequest} from "../../../../clients/generated/commonApi/models";
import {useState} from "react";
import taskService from "../../../../services/task-service/TaskService";

interface TaskFormProps {
    className?: string;
    orderId: string;
    onTaskChanged: () => void;
}

export const TaskForm = (props: TaskFormProps) => {
    const {t} = useTranslation("order");
    const [description, setDescription] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const {
        className,
        orderId,
        onTaskChanged,
    } = props;

    const handleAddTask = async () => {
        const newTask: CreateTaskRequest = {
            orderId: orderId,
            description,
        };

        try {
            await taskService.addTask(newTask);
            onTaskChanged();
        } catch (error) {
            setError("Ошибка при добавлении задачи");
            console.error(error);
        }
    }

    return (
        <div className={className}>
            {error &&
                <p className="text-danger">{error}</p>
            }
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                        <TextField
                            value={description}
                            id="outlined-basic"
                            label={t("Добавить задачу")}
                            variant="outlined"
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
            </div>
            <Button
                variant="contained"
                onClick={handleAddTask}
            >
                {t("Добавить")}
            </Button>
        </div>
    );
};
