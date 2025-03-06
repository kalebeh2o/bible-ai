import { explanationEndpoints } from "@/core/api/endpoints";

export const explanationService = {
  getExplanation: async (verseText: string): Promise<string> => {
    try {
      const explanation = await explanationEndpoints.getExplanation({
        verseText,
      });
      return explanation;
    } catch (error) {
      console.error("Erro ao buscar explicação:", error);
      throw error;
    }
  },
};
