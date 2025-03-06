"use server";

import { versicleService } from "@/services/versicle.service";
import { Versicle } from "@/core/types/entities";

export const getVersicles = async (
  version: string,
  chapter: string,
  book: string
): Promise<Versicle> => {
  return versicleService.getVersicles(version, chapter, book);
};
