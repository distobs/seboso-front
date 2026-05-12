import { useState } from "react";
import BookCard from "../../components/ui/BookCard";
import type { Book } from "../../types/book";

export default function Books() {

  const [books] = useState<Book[]>([
    {
      id: "1",
      title: "Dom Casmurro",
      author: "Machado de Assis",
      launched_at: "19/02/1992",
      description: "Dom Casmurro é um romance escrito por Machado de Assis, publicado em 1899. A obra é narrada por Bento Santiago, conhecido como Dom Casmurro, que conta a história de sua vida e seu relacionamento com Capitu, sua esposa. O livro é famoso por sua ambiguidade e pela dúvida que deixa sobre a fidelidade de Capitu, tornando-se um dos maiores clássicos da literatura brasileira.",
      cover_type: "Brochura",
      edition: "1ª Edição",
      language: "Português",
      genre: "Romance",
      isbn_10_code: "8535903623",
      isbn_13_code: "9788535903622",
      pages: 256,
      publisher: "Companhia das Letras",
      dimentions: "14 x 21 cm",
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      launched_at: "09/09/1948",
      description: "1984 é um romance distópico escrito por George Orwell, publicado em 1948. A obra retrata um futuro opressivo onde o governo controla todos os aspectos da vida social e individual.",
      cover_type: "Brochura",
      edition: "1ª Edição",
      language: "English",
      genre: "Distópico",
      isbn_10_code: "0451524934",
      isbn_13_code: "9780451524935",
      pages: 328,
      publisher: "Penguin Books",
      dimentions: "13 x 20 cm",
    },
  ]);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">
        Catálogo Geral
      </h1>

      <div className="flex flex-col gap-3">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </>
  );
}