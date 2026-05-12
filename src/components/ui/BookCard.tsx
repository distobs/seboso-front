import type { Book } from "../../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (

    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">

      <div className="flex justify-between items-center">
        <div>

          <h2 className="text-lg font-semibold text-gray-800">
            {book.title}
          </h2>

          <p className="text-gray-500">
            {book.author}
          </p>


        </div>
        <div>

        </div>
      </div>
    </div>
  );
}