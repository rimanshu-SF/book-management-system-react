import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

interface BookValues {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
}

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    formValues: BookValues,
    callback: (success: boolean) => void,
  ) => void;
  bookData: BookValues | null;
}

const AddBookModal: React.FC<AddBookModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  bookData,
}) => {
  const initialFormValues: BookValues = {
    title: "",
    author: "",
    genre: "",
    isbn: "",
    publicationDate: "",
    price: 0,
    discountPrice: 0,
    imageUrl: "",
  };

  const [formValues, setFormValues] = useState<BookValues>(initialFormValues);

  useEffect(() => {
    if (bookData) {
      setFormValues(bookData);
    } else {
      setFormValues(initialFormValues);
    }
  }, [bookData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const newValue = e.target.type === "number" ? parseFloat(value) : value;
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues, (success: boolean) => {
      if (success) {
        setFormValues(initialFormValues);
      }
    });
  };

  const handleClose = () => {
    setFormValues(initialFormValues);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="absolute w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="add-book-modal-title"
      aria-describedby="add-book-modal-desc"
    >
      <div className="bg-white w-screen max-w-lg p-6 rounded-lg shadow-lg relative my-5">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2
          id="add-book-modal-title"
          className="text-xl font-semibold text-gray-800 mb-4"
        >
          {bookData ? "Edit Book" : "Add Book"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-4"
          aria-describedby="add-book-modal-desc"
        >
          <div className="flex flex-col w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Book Title */}
              <div className="col-span-1">
                <Label htmlFor="title" labelName="Book Title" />
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  placeholder="Enter Book Title"
                  className="w-full"
                  required
                />
              </div>

              {/* Author */}
              <div className="col-span-1">
                <Label htmlFor="author" labelName="Author" />
                <Input
                  type="text"
                  id="author"
                  name="author"
                  value={formValues.author}
                  onChange={handleChange}
                  placeholder="Enter Author Name"
                  className="w-full"
                  required
                />
              </div>

              {/* ISBN */}
              <div className="col-span-1">
                <Label htmlFor="isbn" labelName="ISBN" />
                <Input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formValues.isbn}
                  onChange={handleChange}
                  placeholder="Enter ISBN"
                  className="w-full"
                  required
                />
              </div>

              {/* Publication Date */}
              <div className="col-span-1">
                <Label htmlFor="publicationDate" labelName="Publication Date" />
                <Input
                  type="date"
                  id="publicationDate"
                  name="publicationDate"
                  value={formValues.publicationDate}
                  onChange={handleChange}
                  placeholder="Enter Publication Date"
                  className="w-full"
                  required
                />
              </div>

              {/* Price */}
              <div className="col-span-1">
                <Label htmlFor="price" labelName="Price" />
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formValues.price || ""}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  className="w-full"
                  required
                />
              </div>

              {/* Discount Price */}
              <div className="col-span-1">
                <Label htmlFor="discountPrice" labelName="Discount Price" />
                <Input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={formValues.discountPrice || ""}
                  onChange={handleChange}
                  placeholder="Enter Discount Price"
                  className="w-full"
                  required
                />
              </div>

              {/* Genre */}
              <div className="col-span-2">
                <Label htmlFor="genre" labelName="Genre" />
                <select
                  id="genre"
                  name="genre"
                  value={formValues.genre}
                  onChange={handleChange}
                  className="w-full py-2 border rounded-md"
                  required
                >
                  <option value="">Select Genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="biography">Biography</option>
                  <option value="mystery">Mystery</option>
                  <option value="thriller">Thriller</option>
                  <option value="romance">Romance</option>
                  <option value="horror">Horror</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="science-fiction">Science Fiction</option>
                  <option value="self-help">Self-Help</option>
                </select>
              </div>
            </div>
          </div>

          <Button
            label={bookData ? "Update Book" : "Add Book"}
            type="submit"
            className="bg-blue-500 p-3 text-white hover:bg-blue-600 rounded-lg"
          />
          <Button
            label={bookData ? "Cancel" : "Reset"}
            type="button"
            className="bg-red-500 p-3 text-white hover:bg-red-600 rounded-lg"
            onClick={() => {
              if (bookData) {
                setFormValues(initialFormValues);
                onClose();
              } else {
                setFormValues(initialFormValues);
              }
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
