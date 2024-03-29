import { IDType, ITeam, ITeamEntity } from "../interfaces/entity.interface.js";

export default class Team implements ITeamEntity {
    name: string;
    avatar?: string;
    project: string;
    lead: IDType;

    constructor(data: ITeam) {
        this.name = data.name;
        this.avatar = data.avatar;
        this.project = data.project;
        this.lead = data.lead;
    }

    get() {
        const team: ITeam = Object.freeze({
            name: this.name,
            avatar: this.avatar,
            project: this.project,
            lead: this.lead,
        });
        return team;
    }
}
