import { IProject } from "./entity.interface.js";

type IProjectRepository = {
    add: (data: IProject) => Promise<boolean>;
};

export default IProjectRepository;
