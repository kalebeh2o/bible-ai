import { Book } from "../types/book";
import { getData } from "../helpers/apiHelper";

export const getbooks = async (): Promise<Book[]> => {
    try {
      const books = await getData<Book[]>("books", {
        needAuth: true,
      });
      console.log("livros carregados com sucesso!", books);
      return books;
    } catch (error) {
      console.error("Erro ao receber dados:", error);
      throw error;
    }
  };