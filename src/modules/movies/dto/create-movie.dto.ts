import {MoviesFormatEnum} from "../enum/movies-format.enum";

export class CreateMovieDto {

    "title": string
    "year": number
    "format": MoviesFormatEnum
    "actors": string[]

}