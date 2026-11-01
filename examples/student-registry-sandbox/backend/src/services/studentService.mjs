export class StudentService {
  constructor({ studentRepository }) {
    this.studentRepository = studentRepository;
  }

  async listStudents() {
    return this.studentRepository.findAll();
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
