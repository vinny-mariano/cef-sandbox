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
