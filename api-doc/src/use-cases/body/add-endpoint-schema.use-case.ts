import {
    ISchemaItem,
    ISchemaItemEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildAddEndpointSchemaUseCase({
    endPointsRepository,
    SchemaItem,
}: {
    endPointsRepository: IEndpointsRepository;
    SchemaItem: ISchemaItemEntityConstructor;
}) {
    return async (data: ISchemaItem) => {
        const ESchemaItem = new SchemaItem(data);
        ESchemaItem.validate();
        const schemaItem = ESchemaItem.get();

        const schema = await endPointsRepository.addEndpointSchema(schemaItem);
        return schema;
    };
}
