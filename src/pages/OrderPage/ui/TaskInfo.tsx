import {useTranslation} from "react-i18next";
import {UiTask} from "../../../clients/generated/commonApi/models";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useCallback, useEffect, useState} from "react";
import taskService from "../../../services/task-service/TaskService";
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import {TaskForm} from "../../../shared/ui/TaskForm";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

interface TaskInfoProps {
    className?: string;
    orderId: string;
    tasks: UiTask[]
}

export const TaskInfo = (props: TaskInfoProps) => {
    const {t} = useTranslation("order");
    const {
        orderId,
    } = props

    const [tasks, setTasks] = useState<UiTask[]>([]);
    const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
    const [selectedDoneTasks, setSelectedDoneTasks] = useState<string[]>([]);
    const [isTaskFormVisible, setTaskFormVisible] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchTasks = useCallback(async () => {
        try {
            const data: UiTask[] = await taskService.getTaskByOrderId(orderId);
            setTasks(data);
        } catch (error) {
            setError("Ошибка при загрузке задач");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [orderId]);
    // Загрузка задач при монтировании компонента
    useEffect(() => {
        const loadTasks = async () => {
            // Вызов fetchTasks и ожидание его завершения
            await fetchTasks();
        };

        loadTasks().catch(error => {
            // Обработка ошибок, если fetchTasks завершится с ошибкой
            console.error("Ошибка при загрузке задач:", error);
        });
    }, [fetchTasks, orderId]);

    const completed = tasks.filter(task => task.isCompleted);
    const notComplecte = tasks.filter(task => !task.isCompleted);


    const handleCheckboxChange = (taskId: string) => {
        setSelectedTasks((prevSelected) => {
            if (prevSelected.includes(taskId)) {
                return prevSelected.filter(id => id !== taskId);
            } else {
                return [...prevSelected, taskId];
            }
        });
    };

    const handleCompleteSelected = async () => {
        await Promise.all(selectedTasks.map(async (taskId) => {
            const req = {completed: true, taskId}; // Формируем запрос для завершения задачи
            await taskService.completeTask(req);
        }));
        setSelectedTasks([]); // Сбрасываем выбранные задачи после выполнения
        // Загрузка обновленного списка задач
        await fetchTasks();
    };

    const handleDoneCheckboxChange = (taskId: string) => {
        setSelectedDoneTasks((prevSelected) => {
            if (prevSelected.includes(taskId)) {
                return prevSelected.filter(id => id !== taskId);
            } else {
                return [...prevSelected, taskId];
            }
        });
    };

    const handleReturnToWorkSelected = async () => {
        await Promise.all(selectedDoneTasks.map(async (taskId) => {
            const req = {completed: false, taskId}; // Формируем запрос для завершения задачи
            await taskService.completeTask(req);
        }));
        setSelectedDoneTasks([]);
        await fetchTasks();
    };

    const handleDeleteDoneSelected = async () => {
        await Promise.all(selectedDoneTasks.map(async (taskId) => {
            await taskService.deleteTask(taskId);
        }));
        setSelectedDoneTasks([]);
        await fetchTasks();
    };


    const handleDeleteSelected = async () => {
        await Promise.all(selectedTasks.map(async (taskId) => {
            await taskService.deleteTask(taskId); // Удаляем задачу
        }));
        setSelectedTasks([]); // Сбрасываем выбранные задачи после удаления
        // Загрузка обновленного списка задач
        await fetchTasks();
    };

    const onChangeTask = async () => {
        await fetchTasks();
    }

    const toggleTaskForm = () => {
        setTaskFormVisible(prev => !prev);
    }

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography className="text-muted" variant="h5" gutterBottom>{t("Не выполнены")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {notComplecte.length > 0 ? (
                            notComplecte.map((task, index) => (
                                <div className="row" key={task.id}>
                                    <Typography variant="subtitle1" gutterBottom
                                                className="col-1 text-start fs-5">
                                        <Checkbox
                                            checked={selectedTasks.includes(task.id!)}
                                            onChange={() => handleCheckboxChange(task.id!)}
                                            color="primary"
                                        />
                                        {index + 1}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        gutterBottom

                                        className="col-10 font-monospace fs-5"
                                    >{task.description}
                                    </Typography>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">{t("Нет не выполненных задач")}.</p> // Сообщение, если нет не выполненных задач
                        )}
                        <div className="mt-5">
                            <Tooltip title={t("Выполнить")}>
                                <Button
                                    disabled={selectedTasks.length === 0}
                                    variant="text"
                                    color="success"
                                    onClick={handleCompleteSelected}>
                                    <DoneIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip title={t("Удалить")}>
                                <IconButton
                                    disabled={selectedTasks.length === 0}
                                    onClick={handleDeleteSelected}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
            <div>
                <Tooltip title={t("Добавить задачу")}>
                    <button
                        type="button"
                        className="btn btn-light mt-1 mb-3"
                        onClick={toggleTaskForm}
                    >
                        <strong>{isTaskFormVisible ? '-' : '+'}</strong>
                    </button>
                </Tooltip>
                {isTaskFormVisible && (
                    <TaskForm
                        orderId={orderId}
                        onTaskChanged={onChangeTask}
                    />
                )}
            </div>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography className="text-muted" variant="h5" gutterBottom>{t("Выполнены")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {completed.length > 0 ? (
                            completed.map((task, index) => (
                                <div className="row" key={task.id}>
                                    <Typography variant="subtitle1" gutterBottom
                                                className="col-1 text-center fs-5">
                                        <Checkbox
                                            checked={selectedDoneTasks.includes(task.id!)}
                                            onChange={() => handleDoneCheckboxChange(task.id!)}
                                            color="primary"
                                        />
                                        {index + 1}
                                    </Typography>
                                    <Typography variant="subtitle1" gutterBottom
                                                className="col-8 font-monospace fs-5">{task.description}</Typography>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">{t("Нет выполненных задач")}.</p> // Сообщение, если нет выполненных задач
                        )}
                        <div className="mt-5">
                            <Tooltip title={t("Вернуть в работу")}>
                                <Button
                                    disabled={selectedDoneTasks.length === 0}
                                    variant="text"
                                    color="primary"
                                    onClick={handleReturnToWorkSelected}>
                                    <RefreshRoundedIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip title={t("Удалить")}>
                                <IconButton
                                    disabled={selectedDoneTasks.length === 0}
                                    onClick={handleDeleteDoneSelected}>
                                    <DeleteIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};
