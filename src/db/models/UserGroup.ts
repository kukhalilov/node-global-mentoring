import { DataTypes, Model, Optional, Transaction } from 'sequelize';
import sequelizeConnection from '../config.js';
import User from './User.js';
import Group from './Group.js';

interface UserGroupAttributes {
    id: string;
    UserId: string;
    GroupId: string;
}

export interface UserGroupInput extends Optional<UserGroupAttributes, 'id'> {}
export interface UserGroupOutput extends UserGroupInput {}

class UserGroup extends Model<UserGroupAttributes, UserGroupInput> implements UserGroupAttributes {
    public id!: string;
    public UserId!: string;
    public GroupId!: string;

    public static addUsersToGroup = async (groupId: string, userIds: string[], transaction: Transaction): Promise<void> => {
        const userGroups = userIds.map(userId => ({ UserId: userId, GroupId: groupId }));
        await UserGroup.bulkCreate(userGroups, { transaction });
    };
}

UserGroup.init({
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },
    GroupId: {
        type: DataTypes.STRING,
        references: {
            model: Group,
            key: 'id'
        }
    }
}, {
    tableName: 'user_groups',
    sequelize: sequelizeConnection
});

User.belongsToMany(Group, {
    through: UserGroup
});

Group.belongsToMany(User, {
    through: UserGroup
});

export default UserGroup;
