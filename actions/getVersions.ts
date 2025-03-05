import { getData } from "../helpers/apiHelper";
import { Version } from "../types/versions";

export const getVersions = async (): Promise<Version[]> => {
    try {
      const books = await getData<Version[]>("versions", {
        needAuth: true,
      });
      console.log("livros carregados com sucesso!", books);
      return books;
    } catch (error) {
      console.error("Erro ao receber dados:", error);
      throw error;
    }
  };