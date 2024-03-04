import { IMember } from "./entity.interface.js";

export type IAddMemberProducer = (data: {
    userData: IMember;
    projectId: string;
}) => Promise<void>;
