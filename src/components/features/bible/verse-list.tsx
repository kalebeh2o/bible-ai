"use client";

import { useState } from "react";
import { Verse } from "@/core/types/entities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExplanation } from "@/hooks/mutations/useExplanation";
import { X } from "lucide-react";
import { AudioPlayer } from "@/components/ui/audio-player";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VerseListProps {
  chapter: number;
  verses: Verse[];
  book: string;
}

export const VerseList = ({ verses, book, chapter }: VerseListProps) => {
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const { explanation, loading, getExplanation, clearExplanation } =
    useExplanation();

  const handleVerseClick = async (
    verseText: string,
    verseNumber: number,
    verseChapter: number,
    book: string
  ) => {
    try {
      console.log(
        `${verseText} Capítulo: ${verseChapter}:${verseNumber} Livro: ${book}`
      );
      setExpandedVerse(verseNumber);
      await getExplanation(
        `${verseText} ${verseChapter}:${verseNumber} ${book}`
      );
    } catch (error) {
      console.error(error);
    }
  };

  const closeExplanation = () => {
    setExpandedVerse(null);
    clearExplanation();
  };

  return (
    <div className="mt-6 space-y-4">
      <ul className="space-y-4">
        {verses.map((verse) => (
          <li key={verse.number} className="relative">
            <div>
              <button
                onClick={() =>
                  handleVerseClick(verse.text, verse.number, chapter, book)
                }
                className="text-left w-full p-4 rounded-lg hover:bg-accent transition-colors"
              >
                <span className="font-semibold text-primary">
                  {verse.number}.{" "}
                </span>
                {verse.text}
              </button>
              {expandedVerse === verse.number && (
                <div className="mt-4">
                  <Card className="relative">
                    <CardContent className="p-4">
                      {loading ? (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <>
                          <div className="absolute top-4 right-4">
                            <TooltipProvider delayDuration={300}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    onClick={closeExplanation}
                                    variant="outline"
                                    size="sm"
                                    className="h-8 w-8 p-0 flex items-center justify-center rounded-full bg-background hover:bg-accent/50"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                  side="left"
                                  className="bg-background"
                                >
                                  <p>Fechar explicação</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>

                          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none pt-4">
                            <h3 className="text-lg font-semibold mb-2">
                              Explicação
                            </h3>

                            {explanation && <AudioPlayer text={explanation} />}

                            <div
                              dangerouslySetInnerHTML={{
                                __html: explanation || "",
                              }}
                            />
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
