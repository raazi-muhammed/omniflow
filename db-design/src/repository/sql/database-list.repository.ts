import { ModelDefined, Sequelize } from "sequelize";
import { logger } from "@omniflow/common";
import { IDBTable, tableModel } from "./models/table.model.js";
import { ITable } from "../../interfaces/entity.interface.js";

export class BuildDatabaseRepository {
    client: Sequelize;
    models: {
        Table: ModelDefined<IDBTable, ITable>;
    };

    constructor(sequelize: Sequelize) {
        const TableModel = tableModel(sequelize);

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
        });
        return tables.map((e) => e.dataValues) as IDBTable[];
    }
}
