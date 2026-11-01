import { studentController, sendJson } from "../controllers/studentController.mjs";

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1024 * 1024) {
      const error = new Error("Request body is too large.");
      error.statusCode = 413;
      error.code = "PAYLOAD_TOO_LARGE";
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("Request body must contain valid JSON.");
    error.statusCode = 400;
    error.code = "INVALID_JSON";
    throw error;
  }
}

export async function handleStudentRoutes(request, response, service) {
  const url = new URL(request.url, `http://${request.headers.host ?? "localhost"}`);

  if (request.method === "GET" && url.pathname === "/api/students") {
    await studentController.list(request, response, service);
    return true;
  }

  const studentMatch = url.pathname.match(/^\/api\/students\/([a-f0-9-]+)$/i);
  if (request.method === "GET" && studentMatch) {
    await studentController.get(request, response, service, studentMatch[1]);
    return true;
  }

  if (request.method === "POST" && url.pathname === "/api/students") {
    const body = await readJsonBody(request);
    await studentController.create(request, response, service, body);
    return true;
  }

  if (url.pathname.startsWith("/api/students")) {
    sendJson(response, 405, {
      error: { code: "METHOD_NOT_ALLOWED", message: "Method or route not supported." },
    });
    return true;
  }

  return false;
}
