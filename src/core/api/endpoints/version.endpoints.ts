import { Version } from "../../types/entities";
import { apiClient } from "../client";

export const versionEndpoints = {
  getVersions: () => apiClient.get<Version[]>("versions", { needAuth: true }),
};
