"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ChapterSelectProps {
  chapters: number[];
  selectedChapter: number;
  onChapterChange: (chapter: number) => void;
  disabled?: boolean;
}

export const ChapterSelect = ({
  chapters,
  selectedChapter,
  onChapterChange,
  disabled = false,
}: ChapterSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="chapter-select">Capítulo</Label>
      <Select
        value={selectedChapter.toString()}
        onValueChange={(value) => onChapterChange(parseInt(value))}
        disabled={disabled}
      >
        <SelectTrigger id="chapter-select" className="w-full">
          <SelectValue placeholder="Selecione um capítulo" />
        </SelectTrigger>
        <SelectContent>
          {chapters.map((chapter) => (
            <SelectItem key={chapter} value={chapter.toString()}>
              {chapter}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
