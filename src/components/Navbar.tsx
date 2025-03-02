import LogoImg from '../assets/images/favicon.webp';
import { Link, NavLink } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const users = useSelector((state: RootState) => state.user.currentUser);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className="w-full bg-gray-900/20 backdrop-blur-2xl h-20 flex items-center justify-between font-pop shadow-lg border-b border-white/10 fixed z-50 px-4 md:px-10 transition-all duration-300">
        {/* Center logo */}
        <div className="flex justify-center items-center">
          <NavLink to="/" className="group">
            <h1 className="text-[36px] md:text-[40px] flex items-center justify-center text-white font-extrabold font-canvet cursor-pointer transition-transform duration-300 group-hover:scale-105">
              <img 
                src={LogoImg} 
                className="w-14 mr-2 transition-transform duration-300 group-hover:rotate-12" 
                alt="Logo" 
              />
              Buy Book
            </h1>
          </NavLink>
        </div>

        {/* Right side buttons */}
        <div className="hidden md:flex gap-6 items-center font-normal text-sm">
          {!users ? (
            <div className="flex gap-4">
              <NavLink to="signup">
                <Button
                  label="SignUp"
                  disabled={false}
                  className="text-lg px-6 py-2 bg-light-org/20 backdrop-blur-md rounded-full border-2 border-light-org/30 hover:bg-light-org/40 text-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                />
              </NavLink>
              <NavLink to="login">
                <Button
                  label="Login"
                  disabled={false}
                  className="text-lg px-6 py-2 text-turquoise bg-turquoise/10 backdrop-blur-md border-2 border-turquoise/30 hover:bg-turquoise/30 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                />
              </NavLink>
            </div>
          ) : (
            <>
              <Link to="/booklist">
                <Button
                  label="Booklist"
                  disabled={false}
                  className="text-lg px-6 py-2 text-turquoise bg-turquoise/10 backdrop-blur-md border-2 border-turquoise/30 hover:bg-turquoise/30 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                />
              </Link>
              <Link to="/logout">
                <Button
                  label="Logout"
                  disabled={false}
                  className="text-lg px-6 py-2 text-light-org bg-light-org/10 backdrop-blur-md border-2 border-light-org/30 hover:bg-light-org/30 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu} 
            className="text-white p-2 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full bg-gray-900/20 backdrop-blur-2xl z-10 flex flex-col items-center gap-6 py-6 shadow-xl border-b border-white/10 animate-slideDown">
          <NavLink 
            to="/" 
            onClick={toggleMobileMenu} 
            className="text-white text-lg font-medium hover:text-turquoise transition-colors duration-200"
          >
            Home
          </NavLink>
          {!users ? (
            <>
              <NavLink
                to="signup"
                onClick={toggleMobileMenu}
                className="text-white text-lg font-medium hover:text-light-org transition-colors duration-200"
              >
                SignUp
              </NavLink>
              <NavLink
                to="login"
                onClick={toggleMobileMenu}
                className="text-white text-lg font-medium hover:text-turquoise transition-colors duration-200"
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <Link to="/booklist">
                <Button
                  label="Booklist"
                  disabled={false}
                  className="text-lg px-6 py-2 text-turquoise bg-turquoise/10 backdrop-blur-md border-2 border-turquoise/30 hover:bg-turquoise/30 rounded-full w-40 text-center transition-all duration-300"
                />
              </Link>
              <Button
                label="Logout"
                disabled={false}
                className="text-lg px-6 py-2 text-turquoise bg-turquoise/10 backdrop-blur-md border-2 border-turquoise/30 hover:bg-turquoise/30 rounded-full w-40 text-center transition-all duration-300"
              />
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;