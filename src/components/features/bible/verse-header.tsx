"use client";

import { Versicle } from "@/core/types/entities";
import { Card, CardContent } from "@/components/ui/card";

interface VerseHeaderProps {
  versicle: Versicle;
}

export const VerseHeader = ({ versicle }: VerseHeaderProps) => {
  return (
    <Card className="mb-6  shadow-none border-none ">
      <CardContent className="flex flex-col items-center text-center py-6">
        <h2 className="text-2xl font-bold text-foreground">
          {versicle.book.name}
        </h2>
        <p className="text-md text-muted-foreground mt-2">
          Escrito por: {versicle.book.author}
        </p>
        <p className="text-xl font-semibold text-foreground mt-3">
          Capítulo {versicle.chapter.number}
        </p>
      </CardContent>
    </Card>
  );
};
