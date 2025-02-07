import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AddBookModal from '../components/AddBookModal';

const mockOnClose = vi.fn();
const mockOnSubmit = vi.fn();

const sampleBook = {
  title: 'Test Book',
  author: 'John Doe',
  genre: 'Fiction',
  isbn: '1234567890',
  publicationDate: '2023-05-15',
  price: 20,
  discountPrice: 15,
};

describe('AddBookModal Component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should not render modal when isOpen is false', () => {
    const { container } = render(
      <AddBookModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );
    expect(container.innerHTML).toBe('');
  });

  test('should render modal when isOpen is true', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test("should display 'Add Book' title when no bookData is provided", () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );
    expect(screen.getByTestId('add-book-btn')).toBeInTheDocument();
  });

  test("should display 'Edit Book' title when bookData is provided", () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={sampleBook}
      />,
    );
    expect(screen.getByText('Edit Book')).toBeInTheDocument();
  });

  test('should prefill form values when editing a book', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={sampleBook}
      />,
    );

    expect(screen.getByDisplayValue(sampleBook.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(sampleBook.author)).toBeInTheDocument();
    expect(screen.getByDisplayValue(sampleBook.isbn)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(sampleBook.publicationDate),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(sampleBook.price.toString()),
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(sampleBook.discountPrice.toString()),
    ).toBeInTheDocument();
    expect(screen.getByText(sampleBook.genre)).toBeInTheDocument();
  });

  test('should update form values when user types', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );

    const titleInput = screen.getByPlaceholderText('Enter Book Title');
    fireEvent.change(titleInput, { target: { value: 'New Book' } });

    expect(titleInput).toHaveValue('New Book');
  });

  test('should call onSubmit when form is submitted', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Book Title'), {
      target: { value: 'New Book' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Author Name'), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter ISBN'), {
      target: { value: '9876543210' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Price'), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter Discount Price'), {
      target: { value: '20' },
    });
    fireEvent.submit(screen.getByTestId('add-book-btn'));
  });

  test('should reset form when submission is successful', () => {
    const mockSuccessCallback = vi.fn((callback) => callback(true));

    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockSuccessCallback}
        bookData={null}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Enter Book Title'), {
      target: { value: 'New Book' },
    });
    fireEvent.click(screen.getByTestId('add-book-btn'));

    expect(screen.getByPlaceholderText('Enter Book Title')).toHaveValue(
      'New Book',
    );
  });

  test('should not close modal when reset button is clicked', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null} // No bookData, so the button should be "Reset"
      />,
    );

    const resetButton = screen.getByTestId('reset-button');
    fireEvent.click(resetButton);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('should close modal when cancel button is clicked', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={{
          title: 'Existing Book',
          author: 'John Doe',
          genre: 'fiction',
          isbn: '1234567890',
          publicationDate: '2021-01-01',
          price: 20,
          discountPrice: 15,
        }}
      />,
    );

    const cancelButton = screen.getByTestId('reset-button'); // Reset button will now be the Cancel button
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('should close modal and reset form when cancel button is clicked', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );

    fireEvent.click(screen.getByText('Reset'));

    expect(screen.getByPlaceholderText('Enter Book Title')).toHaveValue('');
  });

  test('should validate required fields before submitting', () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );

    fireEvent.click(screen.getByTestId('add-book-btn'));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test('should reset form and clear all fields when reset button is clicked', async () => {
    render(
      <AddBookModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        bookData={null}
      />,
    );
      fireEvent.change(screen.getByTestId('form-title'), {
      target: { value: 'Test Book' },
    });
    fireEvent.change(screen.getByTestId('form-author'), {
      target: { value: 'Test Author' },
    });
    fireEvent.change(screen.getByTestId('form-genre'), {
      target: { value: 'Fiction' },
    });
    fireEvent.change(screen.getByTestId('form-isbn'), {
      target: { value: '1234567890' },
    });
    fireEvent.change(screen.getByTestId('form-publicationDate'), {
      target: { value: '2023-05-15' },
    });
    fireEvent.change(screen.getByTestId('form-price'), {
      target: { value: '20' },
    });
    fireEvent.change(screen.getByTestId('form-discoutPrice'), {
      target: { value: '15' },
    });
  
    fireEvent.click(screen.getByText('Reset'));
  
    expect(screen.getByTestId('form-title')).toHaveValue('');
    expect(screen.getByTestId('form-author')).toHaveValue('');
    expect(screen.getByTestId('form-genre')).toHaveValue('');
    expect(screen.getByTestId('form-isbn')).toHaveValue('');
    expect(screen.getByTestId('form-publicationDate')).toHaveValue('');
    expect(screen.getByTestId('form-price')).toHaveValue(null); 
    expect(screen.getByTestId('form-discoutPrice')).toHaveValue(null); 
  });
  
});
