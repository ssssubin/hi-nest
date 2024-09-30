import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { createMovieDto } from "./create-movie.dto";

export class updateMovieDto extends PartialType(createMovieDto) {}
