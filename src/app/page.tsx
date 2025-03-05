"use client";
import { useState, useEffect, JSX } from "react";
import { useTheme } from "@/contexts/themeContext";
import { getAiExplanation } from "../../actions/getExplanation";
import { Book } from "../../types/book";
import { Version } from "../../types/versions";
import { getbooks } from "../../actions/getBooks";
import { getVersions } from "../../actions/getVersions";
import { getVersicles } from "../../actions/getVersicle"; // Importando getVersicles
import { Versicle } from "../../types/versicle";

export default function Home() {
  const { toggleTheme } = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const [versions, setVersions] = useState<Version[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedVersion, setSelectedVersion] = useState<string>("");
  const [chapters, setChapters] = useState<number[]>([]);
  const [versicles, setVersicles] = useState<Versicle | null>(null); // Novo estado para armazenar os versículos
  const [selectedChapter, setSelectedChapter] = useState<number>(0); // Novo estado para o capítulo selecionado
  const [explanation, setExplanation] = useState<string | null>(null); // Estado para armazenar a explicação da IA
  const [expandedVerse, setExpandedVerse] = useState<number | null>(null); // Para saber qual versículo teve a explicação expandida
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getbooks();
        setBooks(booksData);
      } catch (error) {
        console.error("Erro ao buscar os livros:", error);
      }
    };

    const fetchVersions = async () => {
      try {
        const versionsData = await getVersions();
        setVersions(versionsData);
      } catch (error) {
        console.error("Erro ao buscar as versões:", error);
      }
    };

    fetchBooks();
    fetchVersions();
  }, []);

  useEffect(() => {
    const fetchVersicles = async () => {
      if (selectedBook && selectedVersion && selectedChapter > 0) {
        try {
          const versiclesData = await getVersicles(
            selectedVersion,
            String(selectedChapter),
            selectedBook
          );
          setVersicles(versiclesData);
        } catch (error) {
          console.error("Erro ao buscar versículos:", error);
        }
      }
    };

    fetchVersicles();
  }, [selectedBook, selectedVersion, selectedChapter]);

  const handleBookChange = (bookAbbrev: string) => {
    setSelectedBook(bookAbbrev);
    const book = books.find((b) => b.abbrev.pt === bookAbbrev);
    if (book) {
      setChapters(Array.from({ length: book.chapters }, (_, i) => i + 1));
    }
  };

  const handleChapterChange = (chapter: number) => {
    setSelectedChapter(chapter);
  };

  const handleVerseClick = async (verseText: string, verseNumber: number) => {
    try {
      setExpandedVerse(verseNumber); // Expande a explicação para o versículo selecionado
      const explanationContent = await getAiExplanation(verseText);
      setExplanation(explanationContent); // Armazena a explicação no estado
    } catch (error) {
      setExpandedVerse(null); // Expande a explicação para o versículo selecionado
      console.error(error)
      setExplanation("Erro ao carregar explicação. Tente novamente.");
    } finally {
    }
  };

  // Função para fechar a explicação
  const closeExplanation = () => {
    setExpandedVerse(null); // Fecha a explicação
    setExplanation(null); // Limpa a explicação
  };

  return (
    <div className="bg-background text-foreground">
      <header className="bg-gray-800 text-white p-4 flex justify-between ">
        <div className="flex space-x-6 justify-between w-full gap-6 items-center">
          <div className="text-lg">Bíblia Sagrada</div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Select de Livros */}
            <select
              value={selectedBook}
              onChange={(e) => handleBookChange(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer"
            >
              <option value="" disabled hidden>
                Selecione um livro
              </option>
              {books.reduce((acc: JSX.Element[], book, index, arr) => {
                const previousBook = arr[index - 1];
                const testamentName =
                  book.testament === "VT"
                    ? "📜 Antigo Testamento"
                    : "✝️ Novo Testamento";

                if (
                  !previousBook ||
                  book.testament !== previousBook.testament
                ) {
                  acc.push(
                    <option
                      key={`testament-${book.testament}`}
                      value=""
                      disabled
                    >
                      {testamentName}
                    </option>
                  );
                }

                if (!previousBook || book.group !== previousBook.group) {
                  acc.push(
                    <option key={`group-${book.group}`} value="" disabled>
                      {`- ${book.group}`}
                    </option>
                  );
                }

                acc.push(
                  <option key={book.abbrev.pt} value={book.abbrev.pt}>
                    {book.name}
                  </option>
                );

                return acc;
              }, [])}
            </select>

            {/* Select de Capítulos */}
            <select
              disabled={!selectedBook}
              onChange={(e) => handleChapterChange(Number(e.target.value))}
              className="px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer"
            >
              <option value="" disabled hidden>
                Selecione um capítulo
              </option>
              {chapters.map((chapter) => (
                <option key={chapter} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>

            {/* Select de Tradução */}
            <select
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer"
            >
              <option value="" disabled hidden>
                Selecione uma tradução
              </option>
              {versions.map((version) => (
                <option key={version.version} value={version.version}>
                  {version.version.toUpperCase()} ({version.verses} versos)
                </option>
              ))}
            </select>

            <button
              onClick={toggleTheme}
              className="px-6 py-2 bg-blue-500 cursor-pointer text-white rounded-full"
            >
              Alternar Tema
            </button>
          </div>
        </div>
      </header>

      <div className="flex justify-center items-center bg-background text-foreground px-2">
        <div className="text-center">
          {versicles && (
            <div className="flex flex-col">
              <p className="text-xl mt-3 ">{versicles.book.name}</p>
              <p className="text-lg mt-3 ">
                Escrito por: {versicles.book.author}
              </p>
              <p className="text-xl mt-3 ">
                Capítulo: {versicles.chapter.number}
              </p>
            </div>
          )}

          {versicles?.verses !== null ? (
            <div className="mt-4 text-lg">
              <ul className="list-none ml-6 text-left">
                {versicles?.verses.map((versicle, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-start gap-2 mb-4"
                  >
                    {" "}
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        handleVerseClick(versicle.text, versicle.number)
                      }
                    >
                      {" "}
                      <span className="font-semibold">{versicle.number}.</span>
                      <span>{versicle.text}</span>
                    </div>
                    {expandedVerse === versicle.number && explanation && (
                      <div className="mt-2  bg-gray-200 p-4 rounded-md text-sm">
                        <p>{explanation}</p>
                        <button
                          onClick={closeExplanation}
                          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                          Fechar
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xl">
              Selecione um livro, capítulo e tradução para ver os versículos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
