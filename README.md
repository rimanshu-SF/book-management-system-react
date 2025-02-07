# Book Management System (BMS)

The **Book Management System (BMS)** is a simple, easy-to-use tool designed to help organize and manage books in libraries, bookstores, or personal collections. This application allows users to add, edit, delete, and search for books while managing key book details such as title, author, genre, and ISBN.

---

## Phases of Development

### 1. Requirements Phase:

Gather and document all necessary requirements from stakeholders (e.g., users, business managers, technical teams).

#### a) Functional Requirements:

- User login and authentication.
- Add, edit, delete, and search for books.
- Book categories (e.g., fiction, non-fiction, etc.).

#### b) Non-Functional Requirements:

- Scalability and performance.
- Data security and privacy.
- User-friendly interface.

#### c) Technical Requirements:

- **Frontend**: React.js

---

### 2. Design Phase:

#### a) Database Design:

- Create ERD (Entity Relationship Diagram) for tables such as Books, Users, Transactions.

#### b) UI/UX Design:

- Design wireframes for key pages (e.g., login, book list, book details, user profile).

#### c) Architecture Design:

- Design system architecture (client-server, 3-tier model).

---

### 3. Implementation Phase:

#### a) Frontend Development:

- Build static pages using **React.js**, **Tailwind CSS** and **Appwrite**.

---

### 4. Testing Phase:

#### a) Unit Testing with Vitest:

- Unit tests for components are written using **Vitest** to ensure each component behaves as expected.
- To run tests, follow the instructions in the **Setup Instructions** section.

#### b) Integration Testing:

- Test integration between the frontend components and external services.

#### c) User Acceptance Testing (UAT):

- Verify that the system meets the business requirements.

---

### 5. Deployment Phase:

- Deploy the app to a cloud server or web hosting service (e.g., **AWS**, **DigitalOcean**, **Heroku**, **Render**).
- Configure the database server and ensure all environment variables are set up correctly.

---

### 6. Maintenance Phase:

- Regular updates for bug fixes, security patches, and feature enhancements.
- Performance monitoring and scaling based on user growth.

---

## Features

### 1. Add Book

- Allows users to add a new book to their collection using a simple form.
- Includes fields such as title, author, genre, publication year, etc.

### 2. Delete Book

- Users can delete any book they’ve added to the system to keep their collection organized.

### 3. Edit Book

- Users can update the details of any listed book (e.g., correct typos, change author, modify information).

### 4. Display Books

- Displays all books added by the user in a tabular format for easy viewing and management.

### 5. Sort by Author and Title

- Books can be sorted by **Author** and **Title** in either ascending or descending order.
- Sorting is done via a dropdown menu in the "Sort by Title" section.

### 6. Pagination

- Books are displayed in a paginated format, allowing users to navigate easily between pages of books.
- Pagination improves performance by not loading all books at once.

---

## Setup Instructions

### 1. Clone the GitHub Repository

Clone the repository to your local machine:

```bash
git clone 'https://github.com/rimanshu11/book-management-system-react'
```

### 2. Install NPM

```
npm install or npm i
```

### 3. Run Project

```
npm run dev
```

### 4. Run Testing

```
npm install --save-dev vitest
```

### 5. Install Vitest

```
npm install --save-dev vitest
```
