"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Version } from "@/core/types/entities";

interface VersionSelectProps {
  versions: Version[];
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

export const VersionSelect = ({
  versions,
  selectedVersion,
  onVersionChange,
}: VersionSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="version-select">Tradução</Label>
      <Select value={selectedVersion} onValueChange={onVersionChange}>
        <SelectTrigger id="version-select" className="w-full">
          <SelectValue placeholder="Selecione uma tradução" />
        </SelectTrigger>
        <SelectContent>
          {versions.map((version) => (
            <SelectItem key={version.version} value={version.version}>
              {version.version.toUpperCase()} ({version.verses} versos)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
