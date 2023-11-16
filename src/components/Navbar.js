import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { images } from "../constants/constants";
import { useState } from "react";

const Navbar = ({ onFilterChange }) => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [show, setShow] = useState(false);

  const Toggler = () => {
    setShow(!show);
  };

  const handleClick = () => {
    logout();
  };

  return (
    <nav>
      <div className=" flexBetween w-full absolute p-x py-4 z-10 p3 max-xs:px-3">
        <div className="flexCenter">
          <Link to="/">
            <img src={images.logo} alt="logo" className=" w-24 max-sm:w-20" />
          </Link>
        </div>

        <div className="flexRow gap-10 font-medium">
          <Link
            to="/properties?statu=Sale"
            className=" after:h-[2px] after:block after:w-full after:bg-primary-orange after:scale-x-0 hover:after:scale-x-100 duration-300 after:duration-200">
            <h1>Buy</h1>
          </Link>

          <Link
            to="/properties?statu=Rent"
            className=" after:h-[2px] after:block after:w-full after:bg-primary-orange after:scale-x-0 hover:after:scale-x-100 duration-300 after:duration-200">
            <h1>Rent</h1>
          </Link>

          <Link
            to="/AddProperty"
            className=" after:h-[2px] after:block after:w-full after:bg-primary-orange after:scale-x-0 hover:after:scale-x-100 duration-300 after:duration-200">
            <h1>Sell</h1>
          </Link>
        </div>

        {user && (
          <div className="flexCenter relative">
            <img
              src={
                user.logo
                  ? `https://real-estate-server-b8bv.onrender.com/images/${user.logo}`
                  : images.user
              }
              alt="user"
              className="w-[52px] h-[52px] rounded-full object-cover cursor-pointer border-2 border-primary-orange duration-300 hover:border-white"
              onClick={Toggler}
            />
            <div
              className={`flexStart flex-col absolute gap-[14px] bg-primary-dark p-4 shadow-lg min-w-[200px] rounded-tl-lg rounded-bl-lg rounded-br-lg ${
                show
                  ? "scale-x-100 scale-y-100 top-[40%] duration-300 right-[105%]"
                  : " -top-[60%] -right-[95%] scale-y-0 scale-x-0 duration-300"
              }`}>
              <p className="p2 font-semibold mb-2"> {user.username}</p>
              <Link to={`/user/${user._id}`} className=" p3">
                View Profile
              </Link>
              <Link onClick={handleClick} to="/" className="p3">
                Log out
              </Link>
            </div>
          </div>
        )}

        {!user && (
          <div className="flex gap-5">
            <Link to="/login" className="btn-trans max-sm:hidden">
              <h1>Login</h1>
            </Link>
            <Link to="/signup" className="btn-trans">
              <h1>Sign Up</h1>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
