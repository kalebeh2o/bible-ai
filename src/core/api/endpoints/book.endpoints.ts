import { Book } from "../../types/entities";
import { apiClient } from "../client";

export const bookEndpoints = {
  getBooks: () => apiClient.get<Book[]>("books", { needAuth: true }),
};
