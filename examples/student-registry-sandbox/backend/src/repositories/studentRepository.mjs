import { randomUUID } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { Student } from "../entities/Student.mjs";

const DEFAULT_DATA_FILE = fileURLToPath(
  new URL("../../data/students.json", import.meta.url),
);

export class StudentRepository {
  constructor({ dataFile = DEFAULT_DATA_FILE } = {}) {
    this.dataFile = dataFile;
  }

  async readRecords() {
    const content = await readFile(this.dataFile, "utf8");
    const records = JSON.parse(content);

    if (!Array.isArray(records)) {
      throw new Error("Student data must be a JSON array.");
    }

    return records;
  }

  async findAll() {
    const records = await this.readRecords();
    return records.map((record) => Student.fromRecord(record));
  }

  async findById(id) {
    const records = await this.readRecords();
    const record = records.find((student) => student.id === id);
    return record ? Student.fromRecord(record) : null;
  }

  async create(input) {
    const records = await this.readRecords();
    const student = new Student({
      ...input,
      id: input.id ?? randomUUID(),
      status: input.status ?? "active",
      createdAt: input.createdAt ?? new Date().toISOString(),
      registrationDate: new Date().toISOString(),
    });

    records.push(student.toRecord());
    await writeFile(this.dataFile, `${JSON.stringify(records, null, 2)}\n`, "utf8");

    return student;
  }
}
