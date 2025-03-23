import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export interface BookValues {
  id?: number;
  title: string;
  Author: { name: string };
  Category: { genre: string };
  isbn: string;
  publicationDate: string;
  price: number;
  discountPrice: number;
}

interface BookState {
  books: {
    books: BookValues[]; 
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  } | null;
  searchResults: BookValues[];
  loading: boolean;
  error: string | null;
}


const initialState: BookState = {
  books: null,
  searchResults: [],
  loading: false,
  error: null,
};

// Fetch paginated books
export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/book/paginated?page=${page}&limit=${limit}`,
      );
      console.log(response);

      return response.data.data; // Updated to get paginated books correctly
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch books',
      );
    }
  },
);


// Add a new book
export const addBook = createAsyncThunk(
  'book/addBook',
  async (book: BookValues, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/book`,
        book,
      );
      console.log(response);
      
      dispatch(fetchBooks());
      toast.success('Book added successfully!', { autoClose: 1000 });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to add book';
      toast.error(errorMessage, { autoClose: 1000 });
      return rejectWithValue(errorMessage);
    }
  },
);

// Edit an existing book
export const editBook = createAsyncThunk(
  'book/editBook',
  async (
    { id, book }: { id: number; book: BookValues },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/book/${id}`,
        book,
      );
      dispatch(fetchBooks());
      toast.success('Book updated successfully!', { autoClose: 1000 });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update book';
      toast.error(errorMessage, { autoClose: 1000 });
      return rejectWithValue(errorMessage);
    }
  },
);

// Remove a book
export const removeBook = createAsyncThunk(
  'book/removeBook',
  async (id: number, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/book/${id}`);
      dispatch(fetchBooks());
      toast.success('Book deleted successfully!', { autoClose: 1000 });
      return id;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'Failed to delete book';
      toast.error(errorMessage, { autoClose: 1000 });
      return rejectWithValue(errorMessage);
    }
  },
);

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    clearSearchResults(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = {
          books: action.payload.books, // Array of books
          totalItems: action.payload.totalItems,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          limit: action.payload.limit,
        };
        state.loading = false;
      })
      
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(editBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(removeBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeBook.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(removeBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSearchResults } = bookSlice.actions;
export default bookSlice.reducer;
