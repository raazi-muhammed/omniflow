import { BadRequestError } from "@omniflow/common";
import { IHeader } from "../interfaces/entity.interface.js";

export default class Header implements IHeader {
    key: string;
    value: string;
    endpointId: string;
    description?: string;

    constructor(data: IHeader) {
        this.key = data.key;
        this.value = data.value;
        this.endpointId = data.endpointId;
        this.description = data.description;
    }

    validate() {
        // no validation required, added this function to keep consistency
    }

    get() {
        return Object.freeze({
            key: this.key,
            value: this.value,
            endpointId: this.endpointId,
            description: this.description,
        });
    }
}
