import { ModelDefined, Sequelize } from "sequelize";
import { logger } from "@omniflow/common";
import { IDBTable, tableModel } from "./models/table.model.js";
import {
    IRelation,
    ITable,
    ITableField,
} from "../../interfaces/entity.interface.js";
import { IDBTableField, tableFieldModel } from "./models/table-field.model.js";
import { IDBRelation, relationModel } from "./models/relations.model.js";

export class BuildDatabaseRepository {
    client: Sequelize;
    models: {
        Table: ModelDefined<IDBTable, ITable>;
        TableField: ModelDefined<IDBTableField, ITableField>;
        Relation: ModelDefined<IDBRelation, IRelation>;
    };

    constructor(sequelize: Sequelize) {
        const TableModel = tableModel(sequelize);
        const TableFieldModel = tableFieldModel(sequelize);
        relationModel(sequelize);

        TableModel.hasMany(TableFieldModel, {
            as: "fields",
            foreignKey: "tableId",
        });
        TableFieldModel.belongsTo(TableModel, {
            foreignKey: "tableId",
        });

        sequelize
            .sync({ alter: true })
            .then((res) => {
                logger.info("Database sync status\t: Successful");
            })
            .catch((err) => {
                logger.error(err, "Database sync status\t: Failed");
            });

        this.client = sequelize;
        // @ts-ignore
        this.models = sequelize.models;
    }

    async addTable(data: ITable) {
        const table = await this.models.Table.create(data);
        return table.dataValues as IDBTable;
    }
    async changeTablePosition({
        x,
        y,
        tableId,
    }: {
        x: number;
        y: number;
        tableId: string;
    }) {
        const updated = await this.models.Table.update(
            { x, y },
            {
                where: { id: tableId },
            }
        );
        return updated[0] > 0;
    }
    async getTables({ projectId }: { projectId: string }) {
        const tables = await this.models.Table.findAll({
            where: { projectId },
            include: [{ model: this.models.TableField, as: "fields" }],
        });
        return tables.map((e) => e.dataValues) as IDBTable[];
    }
    async getTableById(tableId: string) {
        const table = await this.models.Table.findOne({
            where: { id: tableId },
            include: [{ model: this.models.TableField, as: "fields" }],
        });
        return table.dataValues as IDBTable;
    }
    async addTableField(data: ITableField) {
        const table = await this.models.TableField.create(data);
        return table.dataValues as IDBTableField;
    }
    async addRelation(data: IRelation) {
        const table = await this.models.Relation.create(data);
        return table.dataValues as IDBRelation;
    }
}
