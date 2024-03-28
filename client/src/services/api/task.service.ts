import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "./utils";
import { Service } from ".";

export class TaskService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    addTask(values: {
        name: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        description: string;
        status: string;
        assignee: Object;
    }) {
        this.url = new BuildUrl().module("/tasks");
        this.axiosPost(values);
        return this;
    }

    deleteTask(id: string) {
        this.url = new BuildUrl().module(`/tasks/${id}`);
        this.axiosDelete();
        return this;
    }

    editTask(
        id: string,
        values: {
            name: string;
            priority: number;
            startDate: Date;
            dueDate: Date;
            description: string;
            status: string;
        }
    ) {
        this.url = new BuildUrl().module(`/tasks/${id}`);
        this.axiosPut(values);
        return this;
    }

    getTasks() {
        this.url = new BuildUrl().module("/tasks");
        this.axiosGet();
        return this;
    }

    getTask(id: string) {
        this.url = new BuildUrl().module(`/tasks/${id}`);
        this.axiosGet();
        return this;
    }

    changeTaskStatus(values: { taskId: string; status: string }) {
        this.url = new BuildUrl().module(`/tasks/${values.taskId}/status`);
        this.axiosPatch({ status: values.status });
        return this;
    }
    changeTaskAssignee(values: { taskId: string; assignee: object }) {
        this.url = new BuildUrl().module(`/tasks/${values.taskId}/assignee`);
        this.axiosPatch(values);
        return this;
    }
}
