import { IRequest, ResponseCreator } from "@omniflow/common";
import { IFolderUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetFoldersController({
    folderUseCases,
}: {
    folderUseCases: IFolderUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;

        const folders = await folderUseCases.getFolders({
            projectId: currentProject.id,
        });

        const response = new ResponseCreator();
        return response.setData(folders);
    };
}
