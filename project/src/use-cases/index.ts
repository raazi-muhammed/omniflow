import buildAddProject from "./add-project.use-case.js";
import projectEntities from "../entities/index.js";

const add = buildAddProject(projectEntities.Project);

export default Object.freeze({
    add,
});
