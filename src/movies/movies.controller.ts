import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { createMovieDto } from "./dto/create-movie.dto";
import { updateMovieDto } from "./dto/update-movie.dto";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get("search")
  search(@Query("year") searchingYear: number) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get("/:id")
  getOne(@Param("id") movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: createMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete("/:id")
  deleteMovie(@Param("id") movieId: number) {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch("/:id")
  patch(@Param("id") movieId: number, @Body() updateMovieData: updateMovieDto) {
    return this.moviesService.update(movieId, updateMovieData);
  }
}
