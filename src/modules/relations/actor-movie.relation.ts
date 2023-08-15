import {Actor} from "../actors/actor.model";
import {Movie} from "../movies/movies.model";
import {sequelize} from "../../configs/database.config";
import {DataType} from "sequelize-typescript";

export const ActorsMovies = sequelize.define('ActorsMovies', {
    ActorId: {
        type: DataType.INTEGER,
        references: {
            model: 'Actors', // 'Actors' refers to the table name
            key: 'id',
        }
    },
    MovieId: {
        type: DataType.INTEGER,
        references: {
            model: 'Movies', // 'Movies' refers to the table name
            key: 'id',
        }
    }
});

Actor.belongsToMany(Movie, {
    through: "ActorsMovies",
    // as: 'Movies',
    // foreignKey: 'ActorId',
    // otherKey: 'MovieId'

});

Movie.belongsToMany(Actor, {
    through: "ActorsMovies",
    // as: 'Actors',
    // foreignKey: 'MovieId',
    // otherKey: 'ActorId'
});