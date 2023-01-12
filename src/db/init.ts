import User from './models/User.js';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = async () => {
    // drop users table and create new one
    await User.drop();
    await User.sync({ alter: isDev });

    // add some predefined users to db
    await User.bulkCreate([
        {
            login: 'admin',
            password: 'pass1',
            age: 20,
            isDeleted: false
        },
        {
            login: 'user1',
            password: 'pass2',
            age: 32,
            isDeleted: false
        },
        {
            login: 'user2',
            password: 'pass3',
            age: 25,
            isDeleted: false
        },
        {
            login: 'user3',
            password: 'pass4',
            age: 20,
            isDeleted: false
        }
    ]) as User[];
};

export default dbInit;
