import { BadRequestError } from "@omniflow/common";
import { IVariable, IVariableEntity } from "../interfaces/entity.interface.js";
import { Types } from "mongoose";

export default class Variable implements IVariableEntity {
    name: string;
    type: string;
    endpointId: string;
    description?: string;

    constructor(data: IVariable) {
        this.name = data.name;
        this.type = data.type;
        this.endpointId = data.endpointId;
        this.description = data?.description;
    }

    validate() {
        // no validation required, added this function to keep consistency
    }

    get() {
        return Object.freeze({
            name: this.name,
            type: this.type,
            endpointId: this.endpointId,
            description: this.description,
        });
    }
}
