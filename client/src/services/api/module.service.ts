import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "../utils";
import { Service } from ".";

export class ModuleService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    addModule(values: {
        name: string;
        priority: number;
        startDate: Date;
        dueDate: Date;
        description: string;
        parentModule?: string;
    }) {
        this.url = new BuildUrl().module("/modules");
        this.axiosPost(values);
        return this;
    }

    editModule(
        id: string,
        values: {
            name: string;
            priority: number;
            startDate: Date;
            dueDate: Date;
            description: string;
            parentModule?: string;
        }
    ) {
        this.url = new BuildUrl().module(`/modules/${id}`);
        this.axiosPut(values);
        return this;
    }

    deleteModule(id: string) {
        this.url = new BuildUrl().module(`/modules/${id}`);
        this.axiosDelete();
        return this;
    }

    getModules({ parentModule }: { parentModule?: string }) {
        this.url = new BuildUrl().module(
            `/modules?parentModule=${parentModule}`
        );
        this.axiosGet();
        return this;
    }

    getModule(moduleId: string) {
        this.url = new BuildUrl().module(`/modules/${moduleId}`);
        this.axiosGet();
        return this;
    }

    getModuleList() {
        this.url = new BuildUrl().module("/modules/list");
        this.axiosGet();
        return this;
    }
}
