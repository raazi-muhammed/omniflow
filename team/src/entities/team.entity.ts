import {
    IDType,
    ITeam,
    ITeamEntity,
    InviteStatus,
    Role,
} from "../interfaces/entity.interface.js";

export default class Team implements ITeamEntity {
    name: string;
    avatar?: string;
    project: string;
    members: {
        role: Role;
        inviteStatus: InviteStatus;
        info: IDType;
    }[];
    lead: IDType;

    constructor(data: ITeam) {
        this.name = data.name;
        this.avatar = data.avatar;
        this.project = data.project;
        this.members = data.members;
        this.lead = data.lead;
    }

    get() {
        const team: ITeam = Object.freeze({
            name: this.name,
            avatar: this.avatar,
            project: this.project,
            members: this.members,
            lead: this.lead,
        });
        return team;
    }
}
