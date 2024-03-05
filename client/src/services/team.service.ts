import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

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
    const url = new BuildUrl().team(`/invite-member`);
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
    const url = new BuildUrl().team(`/add-team`);
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
    values: { name: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/remove-team`);
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

export async function getTeams(
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/get-teams`);
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
    const url = new BuildUrl().team(`/change-invitation-status`);
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
    const url = new BuildUrl().team(`/get-members-list`);
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
    const url = new BuildUrl().team(`/team-members?team=${teamName}`);
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
    const url = new BuildUrl().team(`/change-team-lead`);
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

export async function moveMember(
    values: { toTeam: string; fromTeam: string; email: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/move-member`);
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

export async function removeMember(
    values: { team: string; email: string },
    config?: AxiosRequestConfig
): Promise<IResponse> {
    const url = new BuildUrl().team(`/remove-member`);
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
