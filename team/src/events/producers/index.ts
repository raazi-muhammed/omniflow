import { IMemberProducers } from "../../interfaces/broker.interface.js";
import { buildAddMemberProducer } from "./add-member.producer.js";
import { producer } from "../index.js";
import { buildRemoveMemberProducer } from "./remove-member.producer.js";

const removeMemberToProject = buildRemoveMemberProducer(producer);
const addMemberToProject = buildAddMemberProducer(producer);

export const memberProducers: IMemberProducers = {
    removeMemberToProject,
    addMemberToProject,
};
