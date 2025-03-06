"use client";

import { useState } from "react";
import { Book, Verse } from "@/core/types/entities";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExplanation } from "@/hooks/mutations/useExplanation";
import { X } from "lucide-react";

interface VerseListProps {
  chapter: number;
  verses: Verse[];
  book: string;
}

export const VerseList = ({ verses, book, chapter }: VerseListProps) => {
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null);
  const { explanation, loading, getExplanation, clearExplanation } =
    useExplanation();

  const handleVerseClick = async (verseText: string, verseNumber: number, verseChapter: number, book: string) => {
    try {
      setExpandedVerse(verseNumber);
      await getExplanation(`${verseText} ${verseNumber}:${verseChapter} ${book}`);
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
          <li
            key={verse.number}
            className="group"
          >
            <div className="flex flex-col space-y-2">
              <div
                className="flex cursor-pointer p-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => handleVerseClick(verse.text, verse.number, chapter, book )}
              >
                <span className="font-semibold  mr-2">{verse.number}.</span>
                <span className="text-foreground">{verse.text}</span>
              </div>
              
              {expandedVerse === verse.number && (
                <div className="relative mt-2 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                  <Card className="border-none bg-amber-100">
                    <CardContent className="p-4">
                      {loading ? (
                        <div className="flex justify-center items-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                      ) : (
                        <>
                          <div className="absolute top-2 right-2">
                            <Button
                              onClick={closeExplanation}
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 rounded-full"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none pt-4">
                            <h3 className="text-lg font-semibold mb-2">Explicação</h3>
                            <div dangerouslySetInnerHTML={{ __html: explanation || "" }} />
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
