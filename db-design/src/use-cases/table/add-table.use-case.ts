import { ITable } from "../../interfaces/entity.interface.js";
import { IDatabaseRepository } from "../../interfaces/repository.interface.js";

export default function buildAddTableUseCase({
    databaseRepository,
}: {
    databaseRepository: IDatabaseRepository;
}) {
    return async (data: ITable) => {
        const table = await databaseRepository.addTable(data);
        return table;
    };
}
