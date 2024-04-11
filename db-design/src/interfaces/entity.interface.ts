/* Table */
export type ITable = {
    name: string;
    description: string;
    projectId: string;
    x: number;
    y: number;
};

export interface ITableEntity extends ITable {
    validate: () => void;
    get: () => ITable;
}

export interface ITableEntityConstructor {
    new (data: ITable): ITableEntity;
}

export type ITableField = {
    name: string;
    type: string;
    description: string;
    tableId: string;
    options?: string[];
};

/* Relation */
export type IRelation = {
    projectId: string;
    to: string;
    from: string;
};

export interface IRelationEntity extends IRelation {
    validate: () => void;
    get: () => IRelation;
}

export interface IRelationEntityConstructor {
    new (data: IRelation): IRelationEntity;
}
