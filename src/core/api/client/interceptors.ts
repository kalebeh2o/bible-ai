import { ApiError, BibleApiError } from "../../types/api";

export const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = (await response.json()) as ApiError;
    console.error(`Erro da API (${response.status}):`, errorData);
    throw new BibleApiError({
      status: response.status,
      message: errorData.message || "Erro ao consultar a API",
      code: errorData.code,
      details: errorData.details,
    });
  }

  return response.json() as Promise<T>;
};

export const handleError = (error: unknown): never => {
  console.error("Erro na requisição:", error);

  if (error instanceof BibleApiError) {
    throw error;
  }

  throw new BibleApiError({
    status: 500,
    message:
      error instanceof Error
        ? error.message
        : "Erro desconhecido ao processar a requisição",
  });
};
