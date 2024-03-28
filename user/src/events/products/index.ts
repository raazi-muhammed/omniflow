import { buildEditUserProducer } from "./edit-user.producer.js";
import { producer } from "../index.js";
import { IUserProducers } from "../../interfaces/broker.interface.js";

const editUser = buildEditUserProducer(producer);

export const userProducers: IUserProducers = {
    editUser,
};
