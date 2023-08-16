import {ActorsService} from "../actors/actors.service";
import {Movie} from "./movies.model";
import {Actor} from "../actors/actor.model";
import {Op} from 'sequelize'
import {FindAndCountOptions} from 'sequelize/types';
import {CreateMovieDto} from "./dto/create-movie.dto";
import {sequelize} from "../../configs/database.config";
import {CustomError} from "../../utils/custom-error";

export class MoviesService {
    private actorsService: ActorsService;

    constructor() {
        this.actorsService = new ActorsService();
    }


    async createMovie(dto: CreateMovieDto) {
        const movie = await Movie.findOne({
            where: {title: dto.title},
        });
        if (movie) {
            throw new CustomError("MOVIE_EXISTS", {"title": "NOT_UNIQUE"}, "MOVIE_EXISTS");
        }
        const transaction = await sequelize.transaction();
        try {
            const resActors = await Promise.all(dto.actors.map(element => this.actorsService.createActor(element)));
            const movie = await Movie.create(dto, {transaction: transaction});
            console.log(resActors)
            await movie.addActor(resActors, {through: {selfGranted: false}, transaction: transaction});
            await transaction.commit();
            return {
                data: await Movie.findOne({
                    where: {id: movie.id},
                    include: [{
                        model: Actor,
                        through: {
                            attributes: [],
                        }
                    }]
                })
            };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getMovies(actor, title, search, sort = 'id', order = 'ASC', limit = 10, page = 0) {
        const offset = (page - 1) * limit;

        const options: FindAndCountOptions = {
            order: [[sort, order]],
            include: [{
                model: Actor,
                attributes: [],
                through: {attributes: []},
                as: 'Actors'
            }],
            limit,
            offset,
            distinct: true
        };

        if (search) {
            options.where = {
                [Op.or]: [{
                    title: {[Op.eq]: search}
                }, {
                    '$actors.name$': {[Op.eq]: search}
                }]
            };
        } else {
            options.where = title;
            options.include[0].where = actor;
        }

        const movies = await Movie.findAndCountAll(options);
        console.log(movies)

        return {data: movies.rows, meta: {total: movies.count}};
    }

    async getMovie(movieId) {
        const movie = await Movie.findOne({
            where: {id: Number(movieId)},
            include: [{
                model: Actor,
                through: {attributes: []}
            }]
        });
        if (!movie) {
            throw new CustomError("MOVIE_NOT_FOUND", {id: movieId}, "MOVIE_NOT_FOUND");
        }
        // return movie;
        return {data: movie};

    }

    async updateMovie(dto, id) {
        const movie = await Movie.findOne({where: {id: id}});
        if (!movie) {
            throw new CustomError("MOVIE_NOT_FOUND", {movieId: String(id)}, "MOVIE_NOT_FOUND");
        }

        const arr = [];
        const resActors = [];

        dto.actors.forEach((element) => {
            const x = this.actorsService.createActor(element);
            arr.push(x);
        });

        await Promise.all(arr).then(() => {
            arr.forEach((element) => {
                element.then((value) => {
                    resActors.push(value);
                });
            });
        });

        await Movie.update(dto, {where: {id: id}});
        await movie.setActors(resActors);

        const res = await Movie.findOne({
            where: {id: movie.id},
            include: [{
                model: Actor,
                through: {attributes: []}
            }]
        })
        return {
            data: res
        }
    }

    async deleteMovie(movieId: number) {
        const movie = await Movie.findOne({
            where: {id: Number(movieId)}
        });
        if (movie) {
            return await Movie.destroy({
                where: {id: movieId}
            });
        }
        throw new CustomError("MOVIE_NOT_FOUND", {movieId: String(movieId)}, "MOVIE_NOT_FOUND");

    }

    async import(str) {
        const arr = str.split('\n').map((i) => i.split(': ')).reduce((a, [k, v]) => {
            if (!v) a.push({});
            else a[a.length - 1][k] = v;
            return a;
        }, [{}]);

        arr.forEach((element, index) => {
            if (JSON.stringify(element) !== '{}') {
                element['title'] = element['Title'];
                element['year'] = element['Release Year'];
                element['format'] = element['Format'];
                element['actors'] = element['Stars'].split(', ');
                delete element['Title'];
                delete element['Release Year'];
                delete element['Format'];
                delete element['Stars'];
            } else {
                arr[index] = undefined;
            }
        });

        let result = arr.filter(item => item);
        let response = {
            data: [],
            meta: {
                imported: 0,
                total: result.length
            },
            status: 1
        };

        for (const [index, value] of result.entries()) {
            try {
                const newMovie = await this.createMovie(value);
                response.data.push(newMovie);
                response.meta.imported += 1;
            } catch (e) {
                console.error(e);
            }
        }

        return response;
    }
}
