import {
    IVariable,
    IVariableEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildCreateVariableUseCase({
    Variable,
}: {
    Variable: IVariableEntityConstructor;
}) {
    return (data: IVariable) => {
        const variable = new Variable(data);
        variable.validate();
        return variable.get();
    };
}
