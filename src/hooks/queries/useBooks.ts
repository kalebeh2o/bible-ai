"use client";

import { useState, useEffect } from "react";
import { Book } from "@/core/types/entities";
import { getBooks } from "@/actions/book.actions";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getBooks();
        setBooks(booksData);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Erro ao buscar os livros")
        );
        console.error("Erro ao buscar os livros:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};
