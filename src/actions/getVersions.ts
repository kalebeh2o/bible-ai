import { Version } from "@/core/types";
import { getData } from "@/helpers/apiHelper";
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
