import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { IFolder } from "../../../interfaces/entity.interface.js";

export function folderModel(sequelize: Sequelize) {
    const FolderModel: ModelDefined<IDBFolder, IFolder> = sequelize.define(
        "Folder",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            parentFolder: {
                type: DataTypes.STRING,
            },
            projectId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return FolderModel;
}

export type IDBFolder = IFolder & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};
