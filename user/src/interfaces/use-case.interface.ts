import { IUser } from "./entity.interface.js";

export type ISignInUseCase = (userData: IUser) => Promise<IUser>;
