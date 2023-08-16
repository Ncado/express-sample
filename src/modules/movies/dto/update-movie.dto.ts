import {MoviesFormatEnum} from "../enum/movies-format.enum";

export class UpdateMovieDto {

    "title": string
    "year": number
    "format": MoviesFormatEnum
    "actors": string[]

}