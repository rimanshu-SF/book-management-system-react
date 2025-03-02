import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store/store';
import {
  addBook,
  editBook,
  fetchBooks,
  removeBook,
  BookValues,
} from '../redux/slices/bookSlice';
import BookCard from '../components/BookCard';
import Button from '../components/Button';
import AddBookModal from '../components/AddBookModal';
import { toast } from 'react-toastify';
import Input from '../components/Input';
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import { useNavigate } from 'react-router';

function BookList() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editBookData, setEditBookData] = useState<BookValues | null>(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(
    null,
  );
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.book.books?.data);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  useEffect(() => {
    console.log('Fetching books...');
    if (currentUser != null) dispatch(fetchBooks());
    else {
      toast.warning('Login First', { autoClose: 1000 });
      navigate('/');
    }
  }, [dispatch, navigate, currentUser]);

  //method to add book
  const handleAddBook = async (
    formValues: BookValues,
    callback: (success: boolean) => void,
  ) => {
    if (!handleFormValidation(formValues)) {
      callback(false);
      return;
    }

    try {
      if (editIndex !== null) {
        // Edit book
        await dispatch(
          editBook({ id: books[editIndex].id, book: formValues }),
        ).unwrap();
        toast.success('Book updated successfully.', { autoClose: 1000 });
        setModalOpen(false);
        setEditIndex(null);
        setEditBookData(null);
        callback(true);
      } else {
        await dispatch(addBook(formValues)).unwrap();
        setModalOpen(false);
        callback(true);
      }
    } catch (err) {
      callback(false);
    }
  };

  // method to perform form validation
  const handleFormValidation = (newBook: BookValues): boolean => {
    if (
      !newBook.title ||
      !newBook.Author.fullName ||
      !newBook.Category.categoryName ||
      isNaN(newBook.price) ||
      isNaN(newBook.discountPrice)
    ) {
      toast.error('Please fill all required fields.', { autoClose: 1000 });
      return false;
    }
    if (newBook.price < 0 || newBook.discountPrice < 0) {
      toast.error('Price cannot be negative.', { autoClose: 1000 });
      return false;
    }
    if (newBook.discountPrice > newBook.price) {
      toast.error('Discount price cannot be greater than the actual price.', {
        autoClose: 1000,
      });
      return false;
    }
    if (newBook.publicationDate > new Date().toISOString().split('T')[0]) {
      toast.error('Publication date cannot be in the future.', {
        autoClose: 1000,
      });
      return false;
    }
    if (newBook.isbn.length !== 13) {
      toast.error('ISBN should be 13 digits long.', { autoClose: 1000 });
      return false;
    }
    return true;
  };

  //delete book
  const handleDeleteBook = (id: number) => {
    dispatch(removeBook(id));
    toast.success('Book deleted successfully.', { autoClose: 1000 });
    setIsModalVisible(false);
  };

  const handleCancelBook = () => {
    setIsModalVisible(false);
  };

  //method to handle edit book
  const handleEditBook = (index: number) => {
    setEditIndex(index);
    setEditBookData(books[index]);
    setModalOpen(true);
  };

  // method to sort book
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  //method to sort book
  const sortBooks = (books: BookValues[]) => {
    if (!sortBy) return books;

    return books.sort((a, b) => {
      const fieldA = a[sortBy as keyof BookValues];
      const fieldB = b[sortBy as keyof BookValues];

      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return sortOrder === 'asc'
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      }
      if (typeof fieldA === 'number' && typeof fieldB === 'number') {
        return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
      }
      return 0;
    });
  };

  //method to search book
  const filterBooksBySearch = (books: BookValues[]) => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  };

  const filteredAndSortedBooks = useMemo(() => {
    if (!books) return [];

    const searchedBooks = filterBooksBySearch(books);
    return sortBooks(searchedBooks);
  }, [books, searchQuery, sortBooks, filterBooksBySearch]);

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Background gradient with subtle animated blobs */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full bg-gradient-to-br bg-white/10" />
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse top-0 left-0" />
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0" />
      </div>

      {/* Glass container */}
      <div className="relative z-10 flex mt-10 flex-col items-center justify-start p-6 min-h-screen">
        <div className="w-full max-w-5xl backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 mt-12">
          {/* Header section */}
          <div className="flex flex-col sm:flex-row gap-6 justify-between items-center mb-8">
            <Button
              onClick={() => setModalOpen(true)}
              label="Add Book"
              className="w-full sm:w-auto px-3 py-3 bg-turquoise/10 text-white rounded-xl font-semibold hover:bg-turquoise/50 transition-all duration-300 transform hover:scale-105 shadow-md border-2 border-turquoise/20"
            />
            
            {/* Sort and Search controls */}
            <div className="w-full flex flex-col sm:flex-row gap-4">
              <div className="flex gap-3">
                <select
                  onChange={(e) => handleSort(e.target.value)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm appearance-none"
                >
                  <option value="" disabled selected className="bg-gray-900">
                    Sort by
                  </option>
                  <option value="title" className="bg-gray-900">Title</option>
                  <option value="categoryName" className="bg-gray-900">Genre</option>
                </select>
                <Button
                  onClick={() => handleSort(sortBy)}
                  label={
                    sortOrder === 'asc' ? (
                      <ArrowDownNarrowWide className="w-5 h-5" />
                    ) : (
                      <ArrowUpWideNarrow className="w-5 h-5" />
                    )
                  }
                  className="p-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
                />
              </div>
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* Book display section */}
          {filteredAndSortedBooks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white text-xl font-medium opacity-80">
                No books available
              </p>
              <p className="text-gray-400 mt-2">
                Try adding a new book or adjusting your search
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedBooks.map((book, index) => (
                <div
                  key={index}
                  className="rounded-xl p-2 transition-all duration-300 transform hover:scale-102"
                >
                  <BookCard
                    title={book.title}
                    author={book.Author.fullName}
                    genre={book.Category.categoryName}
                    isbn={book.isbn}
                    price={book.price}
                    discountPrice={book.discountPrice}
                    onEdit={() => handleEditBook(index)}
                    onDelete={() => {
                      setSelectedBookIndex(book.id!);
                      setIsModalVisible(true);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <AddBookModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditIndex(null);
          setEditBookData(null);
        }}
        onSubmit={handleAddBook}
        bookData={editBookData}
      />

      <ConfirmationModal
        show={isModalVisible}
        onConfirm={handleDeleteBook}
        onCancel={handleCancelBook}
        message="Are you sure you want to delete this book?"
        bookIndex={selectedBookIndex}
      />
    </div>
  );
}

export default BookList;