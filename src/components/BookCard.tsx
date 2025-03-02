import { PenLine, Trash2 } from 'lucide-react';
import React from 'react';

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
    <div className="w-full flex flex-col bg-turquoise/10 border-2 border-turquoise/50 rounded-lg md:shadow-xl p-4  md:hover:shadow-2xl md:hover:bg-turquoise/20 md:transform md:transition md:duration-300 md:ease-in-out md:hover:scale-105">
      {/* Book Details */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>
        <p className="text-sm text-soft-gary">By: <span className="text-white">{author}</span></p>
        <p className="text-sm text-soft-gary">
          Genre: <span className="text-white">{genre}</span>
        </p>
        <p className="text-white">{isbn}</p>
        <div className="flex flex-col items-start space-x-1">
          <p className="text-xl font-semibold text-dark-green">
            {discountPrice && discountPrice !== 0 && discountPrice !== price
              ? discountPrice
              : price}{' '}
            rs /-
          </p>
          {discountPrice && discountPrice !== price && (
            <p className="text-sm text-muted-red line-through font-bold">{price} rs/-</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-6 space-x-4">
        {onEdit && (
          <button
            onClick={onEdit}
            className="px-5 py-2 bg-turquoise/20 text-white rounded-md border-2 border-turquoise/30 hover:bg-turquoise transition duration-300">
            <PenLine size={20} />
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-5 py-2 flex items-center bg-light-org/20 border-2 border-light-org/30 text-white rounded-md hover:bg-muted-red transition duration-300">
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
