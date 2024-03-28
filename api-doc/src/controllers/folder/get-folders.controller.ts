import { IRequest, ResponseCreator } from "@omniflow/common";
import { IFolderUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildGetFoldersController({
    folderUseCases,
}: {
    folderUseCases: IFolderUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;
        const parentFolder = req.query.parentFolder;

        let folders = [];
        if (typeof parentFolder === "string" && parentFolder != "undefined") {
            folders = await folderUseCases.getFolders({
                projectId: currentProject.id,
                parentFolder,
            });
        } else {
            folders = await folderUseCases.getFolders({
                projectId: currentProject.id,
                parentFolder: null,
            });
        }

        const response = new ResponseCreator();
        return response.setData(folders);
    };
}
