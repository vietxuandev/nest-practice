import { TableColumnOptions } from 'typeorm';

export const baseColumns: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'int',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment',
  },
  {
    name: 'createdAt',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'updatedAt',
    type: 'timestamp',
    default: 'CURRENT_TIMESTAMP',
  },
  {
    name: 'deletedAt',
    type: 'timestamp',
    isNullable: true,
  },
];

export const tableNames = {
  users: 'users',
};
