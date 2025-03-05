import { getData } from "../helpers/apiHelper";
import { Versicle } from "../types/versicle";

export const getVersicles = async (version: string, chapter: string, book: string): Promise<Versicle> => {
    try {
      const books = await getData<Versicle>(`/verses/${version}/${book}/${chapter}`, {
        needAuth: true,
      });
      console.log("livros carregados com sucesso!", books);
      return books;
    } catch (error) {
      console.error("Erro ao receber dados:", error);
      throw error;
    }
  };