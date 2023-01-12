import User from './models/User.js';
import Group from './models/Group.js';
import UserGroup from './models/UserGroup.js';
import sequelizeConnection from './config.js';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => {
    // drop tables and create new ones
    await UserGroup.drop();
    await Group.drop();
    await User.drop();

    await User.sync({ alter: isDev });
    await Group.sync({ alter: isDev });
    await UserGroup.sync({ alter: isDev });

    const t = await sequelizeConnection.transaction();

    try {
        // add some predefined users
        const admin = await User.create({
            login: 'admin',
            password: 'pass1',
            age: 21,
            isDeleted: false
        }, { transaction: t });
        const user2 = await User.create({
            login: 'user2',
            password: 'pass2',
            age: 43,
            isDeleted: false
        }, { transaction: t });
        const user3 = await User.create({
            login: 'user3',
            password: 'pass3',
            age: 30,
            isDeleted: false
        }, { transaction: t });
        const user4 = await User.create({
            login: 'user4',
            password: 'pass4',
            age: 76,
            isDeleted: false
        }, { transaction: t });

        // add some predefined groups
        const adminsGroup = await Group.create({
            name: 'admins',
            permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        }, { transaction: t });
        const visitorsGroup = await Group.create({
            name: 'visitors',
            permissions: ['READ']
        }, { transaction: t });
        const membersGroup = await Group.create({
            name: 'members',
            permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILES']
        }, { transaction: t });

        // add some predefined relations between users and groups
        await UserGroup.addUsersToGroup(adminsGroup.id, [admin.id], t);
        await UserGroup.addUsersToGroup(visitorsGroup.id, [user2.id, user3.id], t);
        await UserGroup.addUsersToGroup(membersGroup.id, [user4.id], t);

        await t.commit();
    } catch (error) {
        await t.rollback();
        console.error(error);
    }
};

export default dbInit;
