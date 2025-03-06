import { apiClient } from "@/core/api/client";
import { RequestOptions } from "@/core/types/api";

/**
 * Função para obter dados de uma API
 * @param endpoint - O endpoint da API
 * @param options - Opções da requisição
 * @returns Dados da API tipados
 */
export const getData = async <T>(
  endpoint: string,
  options?: RequestOptions
): Promise<T> => {
  try {
    const data = await apiClient.get<T>(endpoint, options);
    return data;
  } catch (error) {
    console.error(`Erro ao obter dados de ${endpoint}:`, error);
    throw error;
  }
};
