export class Student {
  constructor({ id, name, email, course, status = "active", createdAt, registrationDate = null }) {
    if (!id) throw new Error("Student id is required.");
    if (!name) throw new Error("Student name is required.");
    if (!email) throw new Error("Student email is required.");
    if (!course) throw new Error("Student course is required.");
    if (!createdAt) throw new Error("Student createdAt is required.");

    this.id = id;
    this.name = name;
    this.email = email;
    this.course = course;
    this.status = status;
    this.createdAt = createdAt;
    this.registrationDate = registrationDate;
  }

  static fromRecord(record) {
    return new Student(record);
  }

  toRecord() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      course: this.course,
      status: this.status,
      createdAt: this.createdAt,
      registrationDate: this.registrationDate,
    };
  }
}
