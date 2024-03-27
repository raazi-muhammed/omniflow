export type ITable = {
    name: string;
    description: string;
    projectId: string;
    x: number;
    y: number;
};

export type ITableField = {
    name: string;
    type: string;
    description: string;
    tableId: string;
    options?: string[];
};

export type IRelation = {
    projectId: string;
    to: string;
    from: string;
};
