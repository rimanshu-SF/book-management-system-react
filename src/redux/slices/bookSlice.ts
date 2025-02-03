import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice: number;
  imageUrl: string;
}

interface BookState {
  books: Book[];
}

const loadBooksFromLocalStorage = (): Book[] => {
  const storedBooks = localStorage.getItem('books');
  return storedBooks ? JSON.parse(storedBooks) : [];
};

const saveBooksToLocalStorage = (books: Book[]) => {
  localStorage.setItem('books', JSON.stringify(books));
};

const initialState: BookState = {
  books: loadBooksFromLocalStorage(),
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
      saveBooksToLocalStorage(state.books);
    },
    editBook: (state, action: PayloadAction<{ index: number; book: Book }>) => {
      state.books[action.payload.index] = action.payload.book;            
    },
    removeBook: (state, action: PayloadAction<number>) => {
      state.books.splice(action.payload, 1);
      saveBooksToLocalStorage(state.books);
    },
  },
});

export const { addBook, editBook, removeBook } = bookSlice.actions;
export default bookSlice.reducer;
