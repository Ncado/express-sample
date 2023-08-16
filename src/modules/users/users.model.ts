import {DataTypes} from "sequelize";
import {sequelize} from "../../configs/database.config";

export const User = sequelize.define('User', {

    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: DataTypes.STRING
}, {
    timestamps: true


});
