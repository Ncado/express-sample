import {Actor} from "../actors/actor.model";
import {Movie} from "../movies/movies.model";
import {sequelize} from "../../configs/database.config";
import {DataTypes} from "sequelize";


export const initializeDatabase = async () => {
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
    await sequelize.sync({force: true});
    console.log('Database & tables created!');
}