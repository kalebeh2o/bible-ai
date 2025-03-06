import { Version } from "@/core/types/entities";
import { versionEndpoints } from "@/core/api/endpoints";

export const versionService = {
  getVersions: async (): Promise<Version[]> => {
    try {
      const versions = await versionEndpoints.getVersions();
      return versions;
    } catch (error) {
      console.error("Erro ao buscar as versões:", error);
      throw error;
    }
  },
};
