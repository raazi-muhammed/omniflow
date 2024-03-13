import {
    ISchemaItem,
    ISchemaItemEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildCreateSchemaItemUseCase({
    SchemaItem,
}: {
    SchemaItem: ISchemaItemEntityConstructor;
}) {
    return (data: ISchemaItem) => {
        const response = new SchemaItem(data);
        response.validate();
        return response.get();
    };
}
