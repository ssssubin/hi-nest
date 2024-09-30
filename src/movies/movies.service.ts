import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { createMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (!movie) {
      // NestJS에서 제공하는 예외 처리
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }
  deleteMovie(id: string) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id); // +string === number
  }
  create(movieData: createMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: string, updateMovieData) {
    const movie = this.getOne(id);
    this.deleteMovie(id);
    // 과거 데이터에 새로운 데이터 더해서 새로운 movie 만듦
    this.movies.push({ ...movie, ...updateMovieData });
  }
}
