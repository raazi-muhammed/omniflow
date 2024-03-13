import { IEndpoint, IVariable } from "./entity.interface.js";

export type ICreateEndpointUseCase = (data: IEndpoint) => IEndpoint;
export type ICreateVariableUseCase = (data: IVariable) => IVariable;
