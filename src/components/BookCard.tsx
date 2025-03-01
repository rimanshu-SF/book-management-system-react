import { PenLine, Trash2 } from "lucide-react";
import React from "react";

interface BookCardProps {
  title: string;
  author: string;
  genre: string;
  price: number;
  isbn: string;
  discountPrice?: number;
  onEdit?: () => void;
  onDelete?: () => void;
  backgroundColor?: string;
}

export const BookCard: React.FC<BookCardProps> = ({
  title,
  author,
  genre,
  isbn,
  price,
  discountPrice,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="w-full flex flex-col bg-white rounded-lg md:shadow-xl border p-4  md:hover:shadow-2xl md:hover:bg-blue-gray md:transform md:transition md:duration-300 md:ease-in-out md:hover:scale-105">
      {/* Book Details */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold text-gray-800 hover:text-light-org transition duration-200">
          {title}
        </h3>
        <p className="text-sm text-gray-500">By: {author}</p>
        <p className="text-sm text-gray-500">
          Genre: <span className="text-teal-500">{genre}</span>
        </p>
        <p>{isbn}</p>
        <div className="flex flex-col items-start space-x-1">
          <p className="text-xl font-semibold text-teal-600">
            {discountPrice && discountPrice !== 0 && discountPrice !== price
              ? discountPrice
              : price}{" "}
            rs /-
          </p>
          {discountPrice && discountPrice !== price && (
            <p className="text-sm text-red-500 line-through">{price} rs/-</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 space-x-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            <PenLine size={20} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-5 py-2 flex items-center bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
