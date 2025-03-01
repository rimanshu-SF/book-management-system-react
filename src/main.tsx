import { Suspense, lazy } from 'react';
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import './index.css';
import App from './App.tsx';
import Home from './pages/Home.tsx';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store/store.ts';
import { NotFound } from './pages/NotFound.tsx';
const BookList = lazy(() => import('./pages/BookList.tsx'));
const Login = lazy(() => import('./pages/Login.tsx'));
const Signup = lazy(() => import('./pages/Signup.tsx'));
const Logout = lazy(()=> import('./pages/Logout.tsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Home />} />
      <Route
        path="login"
        element={
          <Suspense fallback="Loading.......">
            <Login />
          </Suspense>
        }
      />
      <Route
        path="signup"
        element={
          <Suspense fallback="Loading....">
            <Signup />
          </Suspense>
        }
      />
      <Route
        path="logout"
        element={
          <Suspense fallback="Loading....">
            <Logout />
          </Suspense>
        }
      />
      <Route
        path="booklist"
        element={
          <Suspense fallback="Loading...">
            <BookList />
          </Suspense>
        }
      />
    </Route>,
  ),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>,
);
