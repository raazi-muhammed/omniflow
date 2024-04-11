import { BadRequestError } from "@omniflow/common";
import { ISchemaItem } from "../interfaces/entity.interface.js";
import { Types } from "mongoose";

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
        // no validation required, added this function to keep consistency
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
