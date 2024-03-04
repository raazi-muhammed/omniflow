import { IMember, IProject } from "./entity.interface.js";

export type IAddProjectUseCase = (userData: IProject) => IProject;
export type ICreateUserUseCase = (userData: IMember) => IMember;
