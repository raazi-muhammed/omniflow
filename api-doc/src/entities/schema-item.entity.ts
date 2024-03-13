import { BadRequestError } from "@omniflow/common";
import { ISchemaItem } from "../interfaces/entity.interface.js";

export default class SchemaItem implements ISchemaItem {
    key: string;
    type: string;
    endpointId: string;
    options: string[];

    constructor(data: ISchemaItem) {
        this.key = data.key;
        this.type = data.type;
        this.endpointId = data.endpointId;
        this.options = data.options;
    }

    validate() {
        if (!this.key) throw new BadRequestError("Invalid key");
        if (!this.type) throw new BadRequestError("Invalid type");
        if (!this.endpointId) throw new BadRequestError("Invalid endpoint");
    }

    get() {
        return Object.freeze({
            key: this.key,
            type: this.type,
            endpointId: this.endpointId,
            options: this.options,
        });
    }
}
