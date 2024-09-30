import { Test, TestingModule } from "@nestjs/testing";
import { MoviesService } from "./movies.service";
import { NotFoundException } from "@nestjs/common";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create()", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("getAll()", () => {
    it("should return an array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // result가 배열 인스턴스인지 테스트
    });
  });

  describe("getOne()", () => {
    it("should return a movie", () => {
      // 테스트를 위한 movie 생성
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      // ID가 1인 영화 가져옴
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    // 존재하지 않은 아이디를 조회했을 때
    it("should throw 404 error", () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("update()", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      service.update(1, { title: "Updated Title" });
      const updatedMovie = service.getOne(1);
      expect(updatedMovie.title).toEqual("Updated Title");
    });

    it("shoud throw 404 error", () => {
      try {
        service.update(999, { title: "Updated Title" });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("deleteMovie()", () => {
    it("deletes a movie", () => {
      // 테스트를 위한 movie 생성
      service.create({
        title: "Test Movie",
        genres: ["test"],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteMovie(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it("shoud throw 404 error", () => {
      try {
        service.deleteMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
