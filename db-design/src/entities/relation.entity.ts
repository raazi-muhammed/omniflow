import { IRelation, IRelationEntity } from "../interfaces/entity.interface.js";

export default class Relation implements IRelationEntity {
    projectId: string;
    to: string;
    from: string;

    constructor(data: IRelation) {
        this.projectId = data.projectId;
        this.to = data.to;
        this.from = data.from;
    }

    validate() {
        // no validation required, added this function to keep consistency
    }

    get() {
        return Object.freeze({
            projectId: this.projectId,
            to: this.to,
            from: this.from,
        });
    }
}
