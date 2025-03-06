"use server";

import { bookService } from "@/services/book.service";
import { Book } from "@/core/types/entities";

export const getBooks = async (): Promise<Book[]> => {
  return bookService.getBooks();
};
