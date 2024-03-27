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
        const Table = tableModel(sequelize);
        const TableField = tableFieldModel(sequelize);
        const Relation = relationModel(sequelize);

        Table.hasMany(TableField, {
            as: "fields",
            foreignKey: "tableId",
        });
        TableField.belongsTo(Table, {
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
    async editTable({
        id,
        tableData,
    }: {
        id: string;
        tableData: { name: string; description: string };
    }) {
        const deleted = await this.models.Table.update(tableData, {
            where: { id },
        });
        return deleted.length > 0;
    }
    async removeTable({ id }: { id: string }) {
        const deleted = await this.models.Table.destroy({ where: { id } });
        return deleted > 0;
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
        const relation = await this.models.Relation.create(data);
        return relation.dataValues as IDBRelation;
    }
    async getRelations({ projectId }: { projectId: string }) {
        const relations = await this.models.Relation.findAll({
            where: { projectId },
        });

        return relations.map((e) => e.dataValues) as IDBRelation[];
    }
    async removeRelation({ relationId }: { relationId: string }) {
        const deleted = await this.models.Relation.destroy({
            where: { id: relationId },
        });
        return deleted > 0;
    }
    async getRelation({ projectId, to, from }: IRelation) {
        const relations = await this.models.Relation.findOne({
            where: { projectId, to, from },
        });
        return relations?.dataValues as IDBRelation;
    }
}
