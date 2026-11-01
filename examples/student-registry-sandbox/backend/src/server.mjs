import { createServer } from "node:http";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { StudentRepository } from "./repositories/studentRepository.mjs";
import { StudentService } from "./services/studentService.mjs";
import { handleStudentRoutes } from "./routes/studentRoutes.mjs";
import { sendJson } from "./controllers/studentController.mjs";

export function createAppServer({ service } = {}) {
  const studentService = service ?? new StudentService({
    studentRepository: new StudentRepository(),
  });

  return createServer(async (request, response) => {
    const allowedOrigin = "http://localhost:5173";
    response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    try {
      const url = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);

      if (request.method === "GET" && url.pathname === "/api/health") {
        sendJson(response, 200, { status: "ok", service: "student-registry-api" });
        return;
      }

      const handled = await handleStudentRoutes(request, response, studentService);
      if (!handled) {
        sendJson(response, 404, {
          error: { code: "NOT_FOUND", message: "Route not found." },
        });
      }
    } catch (error) {
      const statusCode = Number.isInteger(error.statusCode) ? error.statusCode : 500;
      sendJson(response, statusCode, {
        error: {
          code: error.code ?? "INTERNAL_ERROR",
          message: statusCode === 500 ? "An unexpected error occurred." : error.message,
        },
      });
    }
  });
}

const isMainModule = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  const port = Number(process.env.PORT ?? 3001);
  const server = createAppServer();
  server.listen(port, "127.0.0.1", () => {
    console.log(`Student Registry API listening on http://127.0.0.1:${port}`);
  });
}
