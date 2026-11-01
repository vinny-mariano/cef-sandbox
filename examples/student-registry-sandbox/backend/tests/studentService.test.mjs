import test from "node:test";
import assert from "node:assert/strict";
import { StudentService } from "../src/services/studentService.mjs";

function createService(repositoryOverride = {}) {
  const calls = [];
  const repository = {
    async findAll() { return []; },
    async findById() { return null; },
    async create(input) {
      calls.push(input);
      return { ...input, id: "stu-created", status: "active", createdAt: "2026-01-01T00:00:00.000Z", toRecord() { return this; } };
    },
    ...repositoryOverride,
  };

  return { service: new StudentService({ studentRepository: repository }), calls };
}

test("registerStudent trims fields and normalizes email", async () => {
  const { service, calls } = createService();
  await service.registerStudent({
    name: "  Test Student  ",
    email: " TEST@example.invalid ",
    course: "  Computing  ",
  });

  assert.deepEqual(calls[0], {
    name: "Test Student",
    email: "test@example.invalid",
    course: "Computing",
  });
});

test("registerStudent rejects missing required fields", async () => {
  const { service } = createService();
  await assert.rejects(
    () => service.registerStudent({ name: "Only a name" }),
    (error) => error.statusCode === 400 && error.code === "VALIDATION_ERROR",
  );
});

test("listStudentsGroupedByCourse groups all students by course by default", async () => {
  const students = [
    { course: "ADS", status: "active" },
    { course: "SI", status: "inactive" },
    { course: "ADS", status: "inactive" },
  ];
  const { service } = createService({ async findAll() { return students; } });
  const expected = {
    groupedByCourse: {
      ADS: [students[0], students[2]],
      SI: [students[1]],
    },
  };

  assert.deepEqual(await service.listStudentsGroupedByCourse(), expected);
  assert.deepEqual(await service.listStudentsGroupedByCourse("all"), expected);
});

test("listStudentsGroupedByCourse returns an empty grouping for an empty list", async () => {
  const { service } = createService({ async findAll() { return []; } });

  assert.deepEqual(await service.listStudentsGroupedByCourse(), {
    groupedByCourse: {},
  });
});

test("listStudentsGroupedByCourse filters active students before grouping", async () => {
  const students = [
    { course: "ADS", status: "active" },
    { course: "ADS", status: "inactive" },
    { course: "SI", status: "active" },
  ];
  const { service } = createService({ async findAll() { return students; } });

  assert.deepEqual(await service.listStudentsGroupedByCourse("active"), {
    groupedByCourse: {
      ADS: [students[0]],
      SI: [students[2]],
    },
  });
});

test("listStudentsGroupedByCourse filters inactive students", async () => {
  const students = [
    { course: "ADS", status: "active" },
    { course: "SI", status: "inactive" },
  ];
  const { service } = createService({ async findAll() { return students; } });

  assert.deepEqual(await service.listStudentsGroupedByCourse("inactive"), {
    groupedByCourse: { SI: [students[1]] },
  });
});

test("listStudentsGroupedByCourse rejects an invalid status", async () => {
  const { service } = createService();

  await assert.rejects(
    () => service.listStudentsGroupedByCourse("pending"),
    (error) => error.statusCode === 400 && error.code === "VALIDATION_ERROR",
  );
});

test("listStudentsGroupedByCourse rejects a null status", async () => {
  const { service } = createService();

  await assert.rejects(
    () => service.listStudentsGroupedByCourse(null),
    (error) => error.statusCode === 400 && error.code === "VALIDATION_ERROR",
  );
});

test("listStudentsGroupedByCourse rejects an uppercase status", async () => {
  const { service } = createService();

  await assert.rejects(
    () => service.listStudentsGroupedByCourse("ACTIVE"),
    (error) => error.statusCode === 400 && error.code === "VALIDATION_ERROR",
  );
});
