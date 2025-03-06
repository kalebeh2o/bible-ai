import { RequestOptions } from "../../types/api";

const API_BASE_URL = "https://www.abibliadigital.com.br/api/";
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJXZWQgTWFyIDA1IDIwMjUgMTU6NTg6NDYgR01UKzAwMDAua2FsZWJlZjMxQGVtYWlsLmNvbSIsImlhdCI6MTc0MTE5MDMyNn0.JXdTjdkhDxnq4w8wUYV5RyI3sT-e8dpIed4_9kEDUXQ";

export const createApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

export const getAuthHeader = (): HeadersInit => {
  return { Authorization: `Bearer ${BEARER_TOKEN}` };
};

export const createRequestOptions = (
  options: RequestOptions = {}
): RequestOptions => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.needAuth !== false && getAuthHeader()),
    ...options.headers,
  };

  return { ...options, headers };
};
