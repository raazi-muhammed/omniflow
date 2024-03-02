import { ITeamController } from "../interfaces/controller.interface.js";
import addTeamController from "./add-team.controller.js";

const addTeam = addTeamController();

const teamController: ITeamController = Object.freeze({
    addTeam,
});

export default teamController;
