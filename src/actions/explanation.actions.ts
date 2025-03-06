"use server";

import { explanationService } from "@/services/explanation.service";

export const getAiExplanation = async (verseText: string): Promise<string> => {
  return explanationService.getExplanation(verseText);
};
