import { IRequest, ResponseCreator, validateBody } from "@omniflow/common";
import { IFolderUseCases } from "../../interfaces/use-cases.interface.js";

export default function buildAddFolderController({
    folderUseCases,
}: {
    folderUseCases: IFolderUseCases;
}) {
    return async (req: IRequest) => {
        const currentProject = req.currentProject;
        const folderData = req.body;
        validateBody(folderData, ["name"]);

        const folder = await folderUseCases.addFolder({
            projectId: currentProject.id,
            parentFolder: folderData?.parentFolder
                ? folderData?.parentFolder
                : null,
            name: folderData.name,
        });

        const response = new ResponseCreator();
        return response
            .setData(folder)
            .setMessage("Folder created")
            .setStatusCode(201);
    };
}
