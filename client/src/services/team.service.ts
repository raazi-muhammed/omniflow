import axios, { AxiosRequestConfig } from "axios";
import {
    BuildUrl,
    IResponse,
    adaptErrorResponse,
    adaptSuccessResponse,
} from "./utils";

export async function inviteMemberToTeam(
    values: { email: string; message: string },
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
