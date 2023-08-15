// src/index.ts
import express from "express";
import actorsRoutes from './modules/actors/actors.controller';
import moviesRoutes from './modules/movies/movies.controller';
import authRoutes from './modules/auth/auth.contoller';

import dotenv from 'dotenv';
import {sequelize} from "./configs/database.config";
import {Actor} from "./modules/actors/actor.model";
import {Movie} from "./modules/movies/movies.model";
import {DataTypes} from "sequelize";
import cookieParser from 'cookie-parser';
import {authMiddleware} from "./middlewares/auth.middleware";
import {modifyResponse} from "./middlewares/response.innterceptor";
import {modifyErrorResponse} from "./middlewares/error-handler.interseptor";

const router = express.Router();

const session = require('express-session');

dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(modifyErrorResponse);
app.use(modifyResponse);

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use('/movies', authMiddleware, moviesRoutes);
app.use('/auth', authRoutes);

app.use('/actors', authMiddleware, actorsRoutes);
app.get('/', (req, res) => {
    res.send('Hel  lo from Express and TypeScript!');
});
const ActorsMovies = sequelize.define('ActorsMovies', {
    ActorId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Actors',
            key: 'id',
        }
    },
    MovieId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Movies',
            key: 'id',
        }
    }
});
Actor.belongsToMany(Movie, {
    through: "ActorsMovies",
    foreignKey: 'ActorId',
    otherKey: 'MovieId'
});

Movie.belongsToMany(Actor, {
    through: "ActorsMovies",
    foreignKey: 'MovieId',
    otherKey: 'ActorId'
});


sequelize.sync({force: true})
    .then(() => {

        console.log('Database & tables created!');

        app.listen(3000, () => {
            console.log(`Server started on port ${3000}`);
        });
    });