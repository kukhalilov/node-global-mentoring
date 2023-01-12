import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config.js';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface GroupAttributes {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface GroupInput extends Optional<GroupAttributes, 'id'> {}
export interface GroupOutput extends Required<GroupAttributes> {}

class Group extends Model<GroupAttributes, GroupInput> implements GroupAttributes {
    public id!: string;
    public name!: string;
    public permissions!: Permission[];
}

Group.init(
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
            allowNull: false,
            defaultValue: []
        }
    },
    {
        tableName: 'groups',
        sequelize: sequelizeConnection
    }
);

export default Group;
