import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { studentController } from "../src/controllers/studentController.mjs";
import { StudentRepository } from "../src/repositories/studentRepository.mjs";

const fixture = [
  {
    id: "stu-test-1",
    name: "Fictional Student",
    email: "student@example.invalid",
    course: "Software Development",
    status: "active",
    createdAt: "2026-01-10T12:00:00.000Z",
  },
];

test("findAll returns the students stored in JSON", async () => {
  const directory = await mkdtemp(join(tmpdir(), "student-repo-"));
  const dataFile = join(directory, "students.json");

  try {
    await writeFile(dataFile, JSON.stringify(fixture), "utf8");
    const repository = new StudentRepository({ dataFile });
    const students = await repository.findAll();

    assert.equal(students.length, 1);
    assert.equal(students[0].name, "Fictional Student");
    assert.equal(students[0].createdAt, "2026-01-10T12:00:00.000Z");
    assert.equal(students[0].registrationDate, null);
    assert.deepEqual(JSON.parse(JSON.stringify(students[0].toRecord())), {
      ...fixture[0],
      registrationDate: null,
    });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("list API response represents a legacy registrationDate as null", async () => {
  const directory = await mkdtemp(join(tmpdir(), "student-repo-"));
  const dataFile = join(directory, "students.json");

  try {
    await writeFile(dataFile, JSON.stringify(fixture), "utf8");
    const repository = new StudentRepository({ dataFile });
    let statusCode;
    let responseBody;

    await studentController.list({}, {
      writeHead(code) {
        statusCode = code;
      },
      end(body) {
        responseBody = JSON.parse(body);
      },
    }, {
      async listStudents() {
        return repository.findAll();
      },
    });

    assert.equal(statusCode, 200);
    assert.equal(responseBody.data[0].registrationDate, null);
    assert.deepEqual(responseBody.meta, { total: 1 });
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("create generates and persists one registration date without changing existing records", async () => {
  const directory = await mkdtemp(join(tmpdir(), "student-repo-"));
  const dataFile = join(directory, "students.json");
  const OriginalDate = globalThis.Date;
  let dateCalls = 0;
  const generatedDate = "2026-02-01T10:00:00.000Z";

  try {
    await writeFile(dataFile, JSON.stringify(fixture), "utf8");
    const repository = new StudentRepository({ dataFile });
    globalThis.Date = class extends OriginalDate {
      toISOString() {
        dateCalls += 1;
        return generatedDate;
      }
    };
    const created = await repository.create({
      name: "New Student",
      email: "new.student@example.invalid",
      course: "Computer Science",
      createdAt: "2026-02-01T09:00:00.000Z",
      registrationDate: "1999-01-01T00:00:00.000Z",
    });

    const stored = JSON.parse(await readFile(dataFile, "utf8"));
    assert.equal(stored.length, 2);
    assert.deepEqual(stored[0], fixture[0]);
    assert.deepEqual(stored[1], {
      id: created.id,
      name: "New Student",
      email: "new.student@example.invalid",
      course: "Computer Science",
      status: "active",
      createdAt: "2026-02-01T09:00:00.000Z",
      registrationDate: generatedDate,
    });
    assert.equal(stored[1].registrationDate, generatedDate);
    assert.match(stored[1].registrationDate, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    assert.equal(created.registrationDate, generatedDate);
    assert.equal(dateCalls, 1);
  } finally {
    globalThis.Date = OriginalDate;
    await rm(directory, { recursive: true, force: true });
  }
});

test("create API response includes registrationDate without changing its response shape", async () => {
  const directory = await mkdtemp(join(tmpdir(), "student-repo-"));
  const dataFile = join(directory, "students.json");

  try {
    await writeFile(dataFile, JSON.stringify(fixture), "utf8");
    const repository = new StudentRepository({ dataFile });
    const student = await repository.create({
      name: "New Student",
      email: "new.student@example.invalid",
      course: "Computer Science",
      createdAt: "2026-02-01T09:00:00.000Z",
    });
    let statusCode;
    let responseBody;

    await studentController.create({}, {
      writeHead(code) {
        statusCode = code;
      },
      end(body) {
        responseBody = JSON.parse(body);
      },
    }, {
      async registerStudent() {
        return student;
      },
    }, {});

    assert.equal(statusCode, 201);
    assert.deepEqual(Object.keys(responseBody), ["data"]);
    assert.equal(responseBody.data.registrationDate, student.registrationDate);
    assert.equal(responseBody.data.createdAt, "2026-02-01T09:00:00.000Z");
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
