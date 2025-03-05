import { Book } from "./book";

interface verse {
  number: number;
  text: string;
}

export interface Versicle {
  book: Book;
  chapter: {
    number: number;
    verses: number;
  };
  verses: verse[];
}
