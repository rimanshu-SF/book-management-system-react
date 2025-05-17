import { Outlet } from 'react-router';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  
  return (
    <>
      <div className="main-container w-full min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;