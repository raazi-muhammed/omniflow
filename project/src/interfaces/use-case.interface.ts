import { IProject } from "./entity.interface.js";

export type IAddProjectUseCase = (userData: IProject) => Promise<IProject>;
