import { Book } from "./book.types";

export interface Verse {
  number: number;
  text: string;
}

export interface Versicle {
  book: Book;
  chapter: {
    number: number;
    verses: number;
  };
  verses: Verse[];
}
