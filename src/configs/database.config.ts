import {Env} from "../utils/validate-env";

const Sequelize = require("sequelize");


export const sequelize = new Sequelize(Env.string('DB_DATABASE'), Env.string('DB_USERNAME'),
    Env.string('DB_PASSWORD')
    , {
        dialect: "sqlite",
        host: Env.string('HOST'),
        storage: Env.string('DB_STORAGE'),
        define: {
            timestamps: false,

        }

    });
