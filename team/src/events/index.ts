import { producer } from "./producer.js";
import { buildRemoveMemberProducer } from "./remove-member.producer.js";

const removeMember = buildRemoveMemberProducer(producer);

export const memberProducers = {
    removeMember,
};
