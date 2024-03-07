import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";
import "./interceptor";

export async function inviteMemberToTeam(
    values: {
        email: string;
        message: string;
        username: string;
        name: string;
        avatar?: string;
    },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams/members/invite`);
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function addTeam(
    values: { name: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams`);
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function removeTeam(
    value: { name: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams/${value.name}`);
    return new Promise((resolve, reject) => {
        axios
            .delete(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function getTeams(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function changeInvitationStatus(
    values: { token: string; invitationAccepted: boolean },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams/members/invite/status`);
    return new Promise((resolve, reject) => {
        axios
            .post(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function getMembersList(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams/members`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function getTeamMembers(
    { teamName }: { teamName: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams/${teamName}/members`);
    return new Promise((resolve, reject) => {
        axios
            .get(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function changeTeamLead(
    values: { lead: string; teamName: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(
        `/teams/${values.teamName}/members/change-lead`
    );
    return new Promise((resolve, reject) => {
        axios
            .patch(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function moveMember(
    values: { toTeam: string; fromTeam: string; email: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/teams/${values.toTeam}/members/move`);
    return new Promise((resolve, reject) => {
        axios
            .patch(url, values, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}

export async function removeMember(
    values: { team: string; email: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(
        `/teams/${values.team}/members/${values.email}`
    );
    return new Promise((resolve, reject) => {
        axios
            .delete(url, { ...config, withCredentials: true })
            .then((response) => {
                resolve(adaptSuccessResponse(response));
            })
            .catch((error) => {
                reject(adaptErrorResponse(error));
            });
    });
}
