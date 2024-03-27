import {
    IHeader,
    IHeaderEntityConstructor,
} from "../../interfaces/entity.interface.js";
import { IEndpointsRepository } from "../../interfaces/repository.interface.js";

export default function buildAddEndpointHeaderUseCase({
    endPointsRepository,
    Header,
}: {
    endPointsRepository: IEndpointsRepository;
    Header: IHeaderEntityConstructor;
}) {
    return async (data: IHeader) => {
        const EHeader = new Header(data);
        EHeader.validate();
        const headerData = EHeader.get();

        const header = endPointsRepository.addEndpointHeader(headerData);
        return header;
    };
}
