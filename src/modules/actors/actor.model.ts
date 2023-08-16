import {sequelize} from "../../configs/database.config";
import {DataTypes} from "sequelize";

export const Actor = sequelize.define('Actor', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: true

});