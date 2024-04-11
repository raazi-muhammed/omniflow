import { IDType, ITeam, ITeamEntity } from "../interfaces/entity.interface.js";
import { IDBMemberStatus } from "../repository/mongo/models/member-status.model.js";

export default class Team implements ITeamEntity {
    name: string;
    avatar?: string;
    project: string;
    lead: IDType;
    members: IDBMemberStatus[];

    constructor(data: ITeam) {
        this.name = data.name;
        this.avatar = data.avatar;
        this.project = data.project;
        this.lead = data.lead;
        this.members = data.members;
    }

    get() {
        const team: ITeam = Object.freeze({
            name: this.name,
            avatar: this.avatar,
            project: this.project,
            lead: this.lead,
            members: this.members,
        });
        return team;
    }
}
