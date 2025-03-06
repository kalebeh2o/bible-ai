"use client";

import { JSX } from "react";
import { Book } from "@/core/types/entities";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BookSelectProps {
  books: Book[];
  selectedBook: string;
  onBookChange: (bookAbbrev: string) => void;
}

export const BookSelect = ({
  books,
  selectedBook,
  onBookChange,
}: BookSelectProps) => {
  // Agrupar livros por testamento e grupo
  const oldTestamentBooks = books.filter((book) => book.testament === "VT");
  const newTestamentBooks = books.filter((book) => book.testament === "NT");

  // Agrupar por grupos dentro de cada testamento
  const groupedOldTestament = oldTestamentBooks.reduce((acc, book) => {
    if (!acc[book.group]) {
      acc[book.group] = [];
    }
    acc[book.group].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  const groupedNewTestament = newTestamentBooks.reduce((acc, book) => {
    if (!acc[book.group]) {
      acc[book.group] = [];
    }
    acc[book.group].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  return (
    <div className="space-y-2">
      <Label htmlFor="book-select">Livro</Label>
      <Select value={selectedBook} onValueChange={onBookChange}>
        <SelectTrigger id="book-select" className="w-full">
          <SelectValue placeholder="Selecione um livro" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Antigo Testamento</SelectLabel>
            {Object.entries(groupedOldTestament).map(([group, books]) => (
              <SelectGroup key={`vt-${group}`}>
                <SelectLabel className="pl-4 text-xs opacity-70">
                  {group}
                </SelectLabel>
                {books.map((book) => (
                  <SelectItem key={book.abbrev.pt} value={book.abbrev.pt}>
                    {book.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Novo Testamento</SelectLabel>
            {Object.entries(groupedNewTestament).map(([group, books]) => (
              <SelectGroup key={`nt-${group}`}>
                <SelectLabel className="pl-4 text-xs opacity-70">
                  {group}
                </SelectLabel>
                {books.map((book) => (
                  <SelectItem key={book.abbrev.pt} value={book.abbrev.pt}>
                    {book.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
