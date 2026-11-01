import _ from "lodash";

export class StudentService {
  constructor({ studentRepository }) {
    this.studentRepository = studentRepository;
  }

  async listStudents() {
    return this.studentRepository.findAll();
  }

  async listStudentsGroupedByCourse(status = "all") {
    if (!["active", "inactive", "all"].includes(status)) {
      const error = new Error("Status must be active, inactive or all.");
      error.statusCode = 400;
      error.code = "VALIDATION_ERROR";
      throw error;
    }

    const students = await this.studentRepository.findAll();
    const filteredStudents = status === "all"
      ? students
      : _.filter(students, (student) => student.status === status);

    return { groupedByCourse: _.groupBy(filteredStudents, "course") };
  }

  async getStudent(id) {
    return this.studentRepository.findById(id);
  }

  async registerStudent(input) {
    const name = typeof input.name === "string" ? input.name.trim() : "";
    const email = typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
    const course = typeof input.course === "string" ? input.course.trim() : "";

    if (!name || !email || !course) {
      const error = new Error("Name, email and course are required.");
      error.statusCode = 400;
      error.code = "VALIDATION_ERROR";
      throw error;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const error = new Error("A valid email address is required.");
      error.statusCode = 400;
      error.code = "VALIDATION_ERROR";
      throw error;
    }

    return this.studentRepository.create({ name, email, course });
  }
}
