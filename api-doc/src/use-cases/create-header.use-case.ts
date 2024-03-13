import {
    IHeader,
    IHeaderEntityConstructor,
} from "../interfaces/entity.interface.js";

export default function buildCreateHeaderUseCase({
    Header,
}: {
    Header: IHeaderEntityConstructor;
}) {
    return (data: IHeader) => {
        const header = new Header(data);
        header.validate();
        return header.get();
    };
}
