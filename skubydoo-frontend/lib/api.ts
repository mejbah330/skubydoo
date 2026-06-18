import { API_BASE } from "./constants";

interface RequestOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

async function request<T>(endpoint: string, tokenOrOptions?: string | RequestOptions): Promise<T> {
  let method = "GET";
  let body: unknown | undefined;
  let headers: Record<string, string> = {};

  if (typeof tokenOrOptions === "string") {
    headers["Authorization"] = `Bearer ${tokenOrOptions}`;
  } else if (tokenOrOptions) {
    method = tokenOrOptions.method || "GET";
    body = tokenOrOptions.body;
    headers = { ...headers, ...(tokenOrOptions.headers || {}) };
  }

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE}${endpoint}`, config);

  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || "Request failed");
  }

  return res.json();
}

export const api = {
  get: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, token),
  post: <T>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, { method: "POST", body, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  put: <T>(endpoint: string, body?: unknown, token?: string) =>
    request<T>(endpoint, { method: "PUT", body, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
  delete: <T>(endpoint: string, token?: string) =>
    request<T>(endpoint, { method: "DELETE", headers: token ? { Authorization: `Bearer ${token}` } : {} }),
};
