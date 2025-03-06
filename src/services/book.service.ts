import { Book } from "@/core/types/entities";
import { bookEndpoints } from "@/core/api/endpoints";

export const bookService = {
  getBooks: async (): Promise<Book[]> => {
    try {
      const books = await bookEndpoints.getBooks();
      return books;
    } catch (error) {
      console.error("Erro ao buscar os livros:", error);
      throw error;
    }
  },
};
