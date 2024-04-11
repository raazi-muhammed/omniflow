import { ITable, ITableEntity } from "../interfaces/entity.interface.js";

export default class Table implements ITableEntity {
    name: string;
    description: string;
    projectId: string;
    x: number;
    y: number;

    constructor(data: ITable) {
        this.projectId = data.projectId;
        this.name = data.name;
        this.description = data.description;
        this.x = data.x;
        this.y = data.y;
    }

    validate() {
        // no validation required, added this function to keep consistency
    }

    get() {
        return Object.freeze({
            projectId: this.projectId,
            name: this.name,
            description: this.description,
            x: this.x,
            y: this.y,
        });
    }
}
