import { IMember } from "./entity.interface.js";

export type IMemberProducers = {
    addMemberToProject: (data: {
        userData: IMember;
        projectId: string;
    }) => Promise<void>;
    removeMemberToProject: (data: {
        userEmail: string;
        projectId: string;
    }) => Promise<void>;
};
