import { Versicle } from "@/core/types/entities";
import { versicleEndpoints } from "@/core/api/endpoints";

export const versicleService = {
  getVersicles: async (
    version: string,
    chapter: string,
    book: string
  ): Promise<Versicle> => {
    try {
      const versicles = await versicleEndpoints.getVersicles({
        version,
        chapter,
        book,
      });
      return versicles;
    } catch (error) {
      console.error("Erro ao buscar versículos:", error);
      throw error;
    }
  },
};
