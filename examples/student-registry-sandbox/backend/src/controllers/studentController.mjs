function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

export const studentController = {
  async list(_request, response, service) {
    const students = await service.listStudents();
    sendJson(response, 200, {
      data: students.map((student) => student.toRecord()),
      meta: { total: students.length },
    });
  },

  async get(_request, response, service, id) {
    const student = await service.getStudent(id);
    if (!student) {
      sendJson(response, 404, {
        error: { code: "STUDENT_NOT_FOUND", message: "Student not found." },
      });
      return;
    }

    sendJson(response, 200, { data: student.toRecord() });
  },

  async create(_request, response, service, body) {
    const student = await service.registerStudent(body);
    sendJson(response, 201, { data: student.toRecord() });
  },
};

export { sendJson };
