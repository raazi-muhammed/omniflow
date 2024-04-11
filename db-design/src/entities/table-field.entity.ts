import {
    ITable,
    ITableEntity,
    ITableField,
} from "../interfaces/entity.interface.js";

export default class TableField implements ITableField {
    name: string;
    type: string;
    description: string;
    tableId: string;
    options?: string[];

    constructor(data: ITableField) {
        this.name = data.name;
        this.description = data.description;
        this.type = data.type;
        this.tableId = data.tableId;
        this.options = data.options;
    }

    validate() {
        // no validation required, added this function to keep consistency
    }

    get() {
        return Object.freeze({
            name: this.name,
            description: this.description,
            type: this.type,
            tableId: this.tableId,
            options: this.options,
        });
    }
}
