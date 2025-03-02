import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Label from './Label';
import Input from './Input';
import Button from './Button';

interface BookValues {
  title: string;
  Author: { fullName: string };
  Category: { categoryName: string };
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice: number;
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
    title: '',
    Author: { fullName: '' },
    Category: { categoryName: '' },
    isbn: '',
    publicationDate: '',
    price: 0,
    discountPrice: 0,
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
    const newValue = e.target.type === 'number' ? parseFloat(value) : value;

    if (name === 'author') {
      setFormValues({
        ...formValues,
        Author: { fullName: value },
      });
    } else if (name === 'genre') {
      setFormValues({
        ...formValues,
        Category: { categoryName: value },
      });
    } else {
      setFormValues({ ...formValues, [name]: newValue });
    }
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

  const isEditing = !!bookData;

  return (
    <div
      className="fixed w-full inset-0 mt-10 bg-black/50 flex justify-center items-center z-10"
      aria-hidden={!isOpen}
      role="dialog"
      aria-labelledby="add-book-modal-title"
      aria-describedby="add-book-modal-desc">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 w-screen max-w-lg p-4 rounded-xl shadow-2xl relative my-5 transition-all duration-300">
        <div className="flex justify-between items-center">
          <h2
            id="add-book-modal-title"
            className="text-xl font-semibold text-white mb-4 drop-shadow-md">
            {bookData ? 'Edit Book' : 'Add Book'}
          </h2>
          <p onClick={handleClose} className="mb-4 text-red-800 bg-light-org/10 font-bold border-2 border-red-800/80 cursor-pointer">
            <X size={24} />
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full space-y-4"
          aria-describedby="add-book-modal-desc">
          <div className="flex flex-col w-full space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <Label
                  htmlFor="title"
                  labelName="Book Title"
                  className="text-white/90"
                />
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formValues.title}
                  onChange={handleChange}
                  placeholder="Enter Book Title"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="col-span-1">
                <Label
                  htmlFor="author"
                  labelName="Author"
                  className="text-white/90"
                />
                <Input
                  type="text"
                  id="author"
                  name="author"
                  value={formValues.Author.fullName}
                  onChange={handleChange}
                  placeholder="Enter Author Name"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                  required
                  disabled={isEditing}
                />
              </div>

              <div className="col-span-1">
                <Label
                  htmlFor="isbn"
                  labelName="ISBN"
                  className="text-white/90"
                />
                <Input
                  type="text"
                  id="isbn"
                  name="isbn"
                  value={formValues.isbn}
                  onChange={handleChange}
                  placeholder="Enter ISBN"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                  required
                  disabled={isEditing}
                />
              </div>

              <div className="col-span-1">
                <Label
                  htmlFor="publicationDate"
                  labelName="Publication Date"
                  className="text-white/90"
                />
                <Input
                  type="date"
                  id="publicationDate"
                  name="publicationDate"
                  value={formValues.publicationDate}
                  onChange={handleChange}
                  placeholder="Enter Publication Date"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="col-span-1">
                <Label
                  htmlFor="price"
                  labelName="Price"
                  className="text-white/90"
                />
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={formValues.price || ''}
                  onChange={handleChange}
                  placeholder="Enter Price"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                  required
                />
              </div>

              <div className="col-span-1">
                <Label
                  htmlFor="discountPrice"
                  labelName="Discount Price"
                  className="text-white/90"
                />
                <Input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={formValues.discountPrice || ''}
                  onChange={handleChange}
                  placeholder="Enter Discount Price"
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                />
              </div>

              <div className="col-span-2">
                <Label
                  htmlFor="genre"
                  labelName="Genre"
                  className="text-white/90"
                />
                <select
                  id="genre"
                  name="genre"
                  value={formValues.Category.categoryName}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-white/50 rounded-md focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm py-2"
                  required>
                  <option value="" className="text-white/50">
                    Select Genre
                  </option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Thriller">Thriller</option>
                  <option value="Romance">Romance</option>
                  <option value="Horror">Horror</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Science-Fiction">Science Fiction</option>
                  <option value="Self-Help">Self-Help</option>
                </select>
              </div>
            </div>
          </div>

          <Button
            label={bookData ? 'Update Book' : 'Add Book'}
            type="submit"
            className="bg-blue-500/80 text-white p-3 rounded-lg hover:bg-blue-600/90 backdrop-blur-sm border border-blue-400/30 transition-all duration-200"
          />
          <Button
            label={bookData ? 'Cancel' : 'Reset'}
            type="button"
            className="bg-red-500/80 text-white p-3 rounded-lg hover:bg-red-600/90 backdrop-blur-sm border border-red-400/30 transition-all duration-200"
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
