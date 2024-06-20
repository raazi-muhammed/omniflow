import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "./utils";
import "../interceptor";
import { Service } from ".";

export class TableService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    addTable(values: { name: string; description?: string }) {
        this.url = new BuildUrl().dbDesign("/tables");
        this.axiosPost(values);
        return this;
    }

    getTables() {
        this.url = new BuildUrl().dbDesign("/tables");
        this.axiosGet();
        return this;
    }

    removeTable(tableId: string) {
        this.url = new BuildUrl().dbDesign(`/tables/${tableId}`);
        this.axiosDelete();
        return this;
    }

    getTable(tableId: string) {
        this.url = new BuildUrl().dbDesign(`/tables/${tableId}`);
        this.axiosGet();
        return this;
    }
    editTable(
        tableId: string,
        tableData: { name: string; description?: string }
    ) {
        this.url = new BuildUrl().dbDesign(`/tables/${tableId}`);
        this.axiosPut(tableData);
        return this;
    }
    changeTablePosition(
        tableId: string,
        newPosition: { x: number; y: number }
    ) {
        this.url = new BuildUrl().dbDesign(`/tables/${tableId}`);
        this.axiosPatch(newPosition);
        return this;
    }

    addTableField(
        tableId: string,
        values: {
            name: string;
            description?: string;
            type: string;
            options?: string[];
        }
    ) {
        this.url = new BuildUrl().dbDesign(`/tables/${tableId}/fields`);
        this.axiosPost(values);
        return this;
    }

    removeTableField(tableId: string, fieldId: string) {
        this.url = new BuildUrl().dbDesign(
            `/tables/${tableId}/fields/${fieldId}`
        );
        this.axiosDelete();
        return this;
    }

    addRelation(values: { to: string; from: string }) {
        this.url = new BuildUrl().dbDesign("/relations");
        this.axiosPost(values);
        return this;
    }

    getRelations() {
        this.url = new BuildUrl().dbDesign("/relations");
        this.axiosGet();
        return this;
    }

    removeRelation(id: string) {
        this.url = new BuildUrl().dbDesign(`/relations/${id}`);
        this.axiosDelete();
        return this;
    }
}
