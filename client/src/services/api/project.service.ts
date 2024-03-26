import { AxiosRequestConfig } from "axios";
import { Service } from ".";
import "../interceptor";
import { BuildUrl } from "./utils";

export class ProjectService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }
    getProjects() {
        this.url = new BuildUrl().project("/projects");
        this.axiosGet();
        return this;
    }
    addProject(values: {
        title: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        projectLead: string;
        description: string;
    }) {
        this.url = new BuildUrl().project("/projects");
        this.axiosPost(values);
        return this;
    }
    editProject(values: {
        title: string;
        startDate: Date;
        dueDate: Date;
        description: string;
    }) {
        this.url = new BuildUrl().project("/projects/current");
        this.axiosPut(values);
        return this;
    }

    getProjectById(id: string) {
        this.url = new BuildUrl().project(`/projects/${id}`);
        this.axiosGet();
        return this;
    }
    getCurrentProject() {
        this.url = new BuildUrl().project(`/projects/current`);
        this.axiosGet();
        return this;
    }

    deleteProject() {
        this.url = new BuildUrl().project(`/projects/current`);
        this.axiosDelete();
        return this;
    }
    changeProjectLead(values: { lead: string }) {
        this.url = new BuildUrl().project("/projects/current/change-lead");
        this.axiosPatch(values);
        return this;
    }
}
