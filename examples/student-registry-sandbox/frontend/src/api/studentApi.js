const API_BASE = "/api";

async function request(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message ?? "Request failed.");
  }
  return payload;
}

export const studentApi = {
  async list() {
    return request("/students");
  },
  async create(input) {
    return request("/students", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
};
