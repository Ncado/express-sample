import {sequelize} from "../../configs/database.config";

import {DataTypes} from "sequelize";
import {MoviesFormatEnum} from "./enum/movies-format.enum";


export const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    format: {
        type: DataTypes.ENUM(...Object.values(MoviesFormatEnum))
    },
    year: DataTypes.INTEGER
}, {
    timestamps: true

})



