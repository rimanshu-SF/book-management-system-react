import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { addBook, editBook, removeBook } from "../redux/slices/bookSlice";
import BookCard from "../components/BookCard";
import Button from "../components/Button";
import AddBookModal from "../components/AddBookModal";
import { toast } from "react-toastify";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { ArrowDownNarrowWide, ArrowUpWideNarrow } from "lucide-react";
import ConfirmationModal from "../components/ConfirmationModal";

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

function BookList() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editBookData, setEditBookData] = useState<BookValues | null>(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState<number | null>(
    null,
  );
  const dispatch = useDispatch();
  const { books, user } = useSelector((state: RootState) => ({
    books: state.book.books,
    user: state.user.currentUser,
  }));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleAddBook = (
    formValues: BookValues,
    callback: (success: boolean) => void,
  ) => {
    if (handleFormValidation(formValues)) {
      if (editIndex !== null) {
        dispatch(editBook({ index: editIndex, book: formValues }));
        toast.success("Book updated successfully.", { autoClose: 1000 });
      } else {
        dispatch(addBook(formValues));
        toast.success("Book added successfully.", { autoClose: 1000 });
      }
      setModalOpen(false);
      setEditIndex(null);
      setEditBookData(null);
      callback(true);
    } else {
      callback(false);
    }
  };

  const handleFormValidation = (newBook: BookValues): boolean => {
    if (
      !newBook.title ||
      !newBook.author ||
      !newBook.genre ||
      isNaN(newBook.price) ||
      isNaN(newBook.discountPrice)
    ) {
      toast.error("Please fill all required fields.", { autoClose: 1000 });
      return false;
    }
    if (newBook.price < 0 || newBook.discountPrice < 0) {
      toast.error("Price cannot be negative.", { autoClose: 1000 });
      return false;
    }
    if (newBook.discountPrice > newBook.price) {
      toast.error("Discount price cannot be greater than the actual price.", {
        autoClose: 1000,
      });
      return false;
    }
    if (newBook.publicationDate > new Date().toISOString().split("T")[0]) {
      toast.error("Publication date cannot be in the future.", {
        autoClose: 1000,
      });
      return false;
    }
    if (newBook.isbn.length !== 13) {
      toast.error("ISBN should be 13 digits long.", { autoClose: 1000 });
      return false;
    }
    return true;
  };

  const handleDeleteBook = (index: number) => {
    dispatch(removeBook(index));
    toast.success("Book deleted successfully.", { autoClose: 1000 });
    setIsModalVisible(false);
  };

  const handleCancelBook = () => {
    setIsModalVisible(false);
  };

  const handleEditBook = (index: number) => {
    setEditIndex(index);
    setEditBookData(books[index]);
    setModalOpen(true);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredBooks = useMemo(() => {
    return books
      .filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => {
        if (!sortBy) return 0;
        const fieldA = a[sortBy as keyof BookValues];
        const fieldB = b[sortBy as keyof BookValues];
        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return sortOrder === "asc"
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }
        if (typeof fieldA === "number" && typeof fieldB === "number") {
          return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
        }
        return 0;
      });
  }, [books, searchQuery, sortBy, sortOrder]);

  return (
    <div className="flex flex-col justify-around items-center bg-blue-gray">
      <div className="flex gap-8 mt-24 flex-col justify-between items-center sm:min-h-60 w-full">
        {/* add book button */}
        <Button
          onClick={() => setModalOpen(true)}
          label="Add Book"
          className="text-2xl px-4 py-3 shadow-lg shadow-dark-green duration-200 transition-transform border-4 border-lime-green bg-lime-green hover:bg-dark-green rounded-full text-white"
        />
        {/* search and sort */}
        <div className="w-full  md:flex md:flex-row flex flex-col justify-between gap-8 p-2">
          <div className="w-full md:w-1/3 flex gap-3">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="py-1 px-3 bg-navy-blue border-none text-white font-semibold rounded-md"
            >
              <option value="" disabled selected>
                Sort by
              </option>
              <option value="author">Author</option>
              <option value="title">Title</option>
              <option value="genre">Genre</option>
            </select>
            <Button
              onClick={handleSort}
              label={
                sortOrder === "asc" ? (
                  <ArrowDownNarrowWide />
                ) : (
                  <ArrowUpWideNarrow />
                )
              }
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            />
          </div>
          <div className="w-full md:w-2/3">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title"
              className="px-4 py-2 border rounded-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Display Book Cards */}
      <div className="flex w-full flex-wrap justify-center mt-4 md:flex-nowrap">
        {filteredBooks.map((book, index) => (
          <div
            key={index}
            className="md:shadow-inner border-2 w-full p-1 md:w-1/3"
          >
            <BookCard
              title={book.title}
              author={book.author}
              genre={book.genre}
              isbn={book.isbn}
              price={book.price}
              discountPrice={book.discountPrice}
              onEdit={() => handleEditBook(index)}
              onDelete={() => {
                setSelectedBookIndex(index);
                setIsModalVisible(true);
              }}
            />
          </div>
        ))}
      </div>

      {/* add book modal */}
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

      {/* Confirmation Modal */}
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
