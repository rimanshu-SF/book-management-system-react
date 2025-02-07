import LogoImg from '../assets/images/favicon.webp';
import { NavLink } from 'react-router-dom';
import Button from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const currentSession = useSelector(
    (state: RootState) => state.user.cookieFallback,
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav data-testid="navbar">
        <div className="w-full bg-navy-blue h-20 flex items-center justify-between font-pop shadow-sm fixed z-10 px-4 md:px-8">
          {/* Center code */}
          <div className="center flex justify-center items-center">
            <NavLink to="/">
              <h1 className="text-[40px] md:text-[40px] flex items-center justify-center text-light-org font-extrabold font-canvet cursor-pointer">
                <img src={LogoImg} className="w-16" alt="Logo" />
                Buy Book
              </h1>
            </NavLink>
          </div>
          {/* Right side code */}
          <div className="right hidden md:flex gap-4 md:gap-20 items-center font-normal text-sm">
            {!currentSession ? (
              <div className="flex gap-4">
                <NavLink to="signup">
                  <Button
                    label="SignUp"
                    disabled={false}
                    className="text-lg p-2 bg-light-org rounded-xl cursor-pointer border-2 border-light-org hover:text-white"
                  />
                </NavLink>
                <NavLink to="login">
                  <Button
                    label="Login"
                    disabled={false}
                    className="text-lg p-2 text-turquoise hover:bg-light-org hover:border-light-org border-2 border-turquoise hover:text-white rounded-xl cursor-pointer"
                  />
                </NavLink>
              </div>
            ) : (
              <NavLink to="/logout">
                <Button
                  label="Logout"
                  disabled={false}
                  className="text-lg p-2 text-turquoise hover:bg-coral-pink hover:border-coral-pink border-2 border-turquoise hover:text-white rounded-xl cursor-pointer"
                />
              </NavLink>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="text-white">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 w-full bg-navy-blue z-10 flex flex-col items-center gap-4 py-4">
            <NavLink to="/" onClick={toggleMobileMenu} className="text-white">
              Home
            </NavLink>
            {!currentSession ? (
              <>
                <NavLink
                  to="signup"
                  onClick={toggleMobileMenu}
                  className="text-white">
                  SignUp
                </NavLink>
                <NavLink
                  to="login"
                  onClick={toggleMobileMenu}
                  className="text-white">
                  Login
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/logout"
                onClick={toggleMobileMenu}
                className="text-white">
                Logout
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
