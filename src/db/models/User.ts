import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config.js';

interface UserAttributes {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}
export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/,
                    msg: 'Password must be between 4 and 10 characters' +
                        ' long and contain at least one letter and one number'
                }
            }
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {
                    msg: 'Age must be an integer'
                },
                min: {
                    args: [4],
                    msg: 'Age must be equal to or greater than 4'
                },
                max: {
                    args: [130],
                    msg: 'Age must be be equal to or less than 130'
                }
            }
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        sequelize: sequelizeConnection
    }
);

export default User;
