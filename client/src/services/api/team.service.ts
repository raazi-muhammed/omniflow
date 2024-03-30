import { AxiosRequestConfig } from "axios";
import { BuildUrl } from "./utils";
import "../interceptor";
import { Service } from ".";

export class TeamService extends Service {
    constructor(config?: AxiosRequestConfig) {
        super(config);
    }

    inviteMemberToTeam(values: {
        email: string;
        message: string;
        username: string;
        name: string;
        avatar?: string;
    }) {
        this.url = new BuildUrl().team("/teams/members/invite");
        this.axiosPost(values);
        return this;
    }

    addTeam(values: { name: string }) {
        this.url = new BuildUrl().team("/teams");
        this.axiosPost(values);
        return this;
    }

    removeTeam(value: { name: string }) {
        this.url = new BuildUrl().team(`/teams/${value.name}`);
        this.axiosDelete();
        return this;
    }

    getTeams() {
        this.url = new BuildUrl().team("/teams");
        this.axiosGet();
        return this;
    }
    getTeam({ name }: { name: string }) {
        this.url = new BuildUrl().team(`/teams/${name}`);
        this.axiosGet();
        return this;
    }

    changeInvitationStatus(values: {
        token: string;
        invitationAccepted: boolean;
    }) {
        this.url = new BuildUrl().team("/teams/members/invite/status");
        this.axiosPatch(values);
        return this;
    }

    getMembersList() {
        this.url = new BuildUrl().team("/teams/members");
        this.axiosGet();
        return this;
    }

    getTeamMembers({ teamName }: { teamName: string }) {
        this.url = new BuildUrl().team(`/teams/${teamName}/members`);
        this.axiosGet();
        return this;
    }

    changeTeamLead(values: { lead: string; teamName: string }) {
        this.url = new BuildUrl().team(
            `/teams/${values.teamName}/members/change-lead`
        );
        this.axiosPatch(values);
        return this;
    }

    moveMember(values: { toTeam: string; fromTeam: string; email: string }) {
        this.url = new BuildUrl().team(`/teams/${values.toTeam}/members/move`);
        this.axiosPatch(values);
        return this;
    }

    removeMember(values: { team: string; email: string }) {
        this.url = new BuildUrl().team(
            `/teams/${values.team}/members/${values.email}`
        );
        this.axiosDelete();
        return this;
    }
    removeMemberFromProject(values: { memberId: string }) {
        this.url = new BuildUrl().team(`/members/${values.memberId}`);
        this.axiosDelete();
        return this;
    }
}
