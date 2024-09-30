import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { AppController } from "./app.controller";

@Module({
  imports: [MoviesModule],
  controllers: [AppController],
})
export class AppModule {}
