"use client";

import { useState } from "react";
import { useBooks } from "@/hooks/queries/useBooks";
import { useVersions } from "@/hooks/queries/useVersions";
import { useVersicles } from "@/hooks/queries/useVersicles";
import { Header } from "@/components/layout/header";
import { BookSelect } from "./book-select";
import { ChapterSelect } from "./chapter-select";
import { VersionSelect } from "./version-select";
import { VerseHeader } from "./verse-header";
import { VerseList } from "./verse-list";
import { Card, CardContent } from "@/components/ui/card";

export const BibleContainer = () => {
  const { books } = useBooks();
  const { versions } = useVersions();

  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("nvi");
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [chapters, setChapters] = useState<number[]>([]);

  const { versicles, loading: loadingVersicles } = useVersicles(
    selectedVersion,
    String(selectedChapter),
    selectedBook
  );

  const handleBookChange = (bookAbbrev: string) => {
    setSelectedBook(bookAbbrev);
    setSelectedChapter(1)
    const book = books.find((b) => b.abbrev.pt === bookAbbrev);
    if (book) {
      setChapters(Array.from({ length: book.chapters }, (_, i) => i + 1));
    }
  };

  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter);
  };

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-3xl">
          <div className="w-full sm:w-1/3">
            <BookSelect
              books={books}
              selectedBook={selectedBook}
              onBookChange={handleBookChange}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <ChapterSelect
              chapters={chapters}
              selectedChapter={selectedChapter}
              onChapterChange={handleChapterChange}
              disabled={!selectedBook}
            />
          </div>
          <div className="w-full sm:w-1/3">
            <VersionSelect
              versions={versions}
              selectedVersion={selectedVersion}
              onVersionChange={handleVersionChange}
            />
          </div>
        </div>
      </Header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {loadingVersicles ? (
            <Card className="w-full border-0">
              <CardContent className="flex justify-center items-center p-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  <p className="text-muted-foreground">
                    Carregando versículos...
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : versicles ? (
            <>
              <VerseHeader versicle={versicles} />
              <VerseList verses={versicles.verses} book={selectedBook} chapter={selectedChapter}/>
            </>
          ) : (
            <Card className="w-full shadow-none border-none">
              <CardContent className="flex justify-center items-center p-12 text-center">
                <p className="text-xl text-muted-foreground">
                  Selecione um livro, capítulo e tradução para ver os
                  versículos.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};
