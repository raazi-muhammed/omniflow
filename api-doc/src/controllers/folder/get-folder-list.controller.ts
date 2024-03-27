import { IRequest, ResponseCreator } from "@omniflow/common";
import { IFolderUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetFolderListController({
    folderUseCases,
}: {
    folderUseCases: IFolderUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;

        const folders = await folderUseCases.getFolderList({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(folders);
    };
}
