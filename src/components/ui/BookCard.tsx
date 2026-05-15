import type { Book } from "../../types/book";

type Props = {
  book: Book;
};

export default function BookCard({ book }: Props) {
  return (

    <div className="
    bg-white border 
    border-gray-200 
    rounded-lg 
    p-4 
    shadow-sm 
    cursor-pointer 
    hover:shadow-md 
    transition-shadow">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <div>

          <h2 className="text-lg font-semibold text-[#2f2a28] mb-1.5">
            {book.title}
          </h2>

          <p className="text-sm text-gray-500 mb-1">
            {book.author}
          </p>

          <p className="text-sm text-gray-500">
            {book.publisher}
          </p>


        </div>
        <div>

        </div>
      </div>
    </div>
  );
}