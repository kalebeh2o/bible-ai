import { Versicle } from "../../types/entities";
import { GetVersiclesParams } from "../../types/api";
import { apiClient } from "../client";

export const versicleEndpoints = {
  getVersicles: ({ version, book, chapter }: GetVersiclesParams) =>
    apiClient.get<Versicle>(`/verses/${version}/${book}/${chapter}`, {
      needAuth: true,
    }),
};
