"use server";

import { versionService } from "@/services/version.service";
import { Version } from "@/core/types/entities";

export const getVersions = async (): Promise<Version[]> => {
  return versionService.getVersions();
};
