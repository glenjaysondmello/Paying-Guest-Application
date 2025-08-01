import React, { useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { clearAuthUser, setAuthUser } from "../features/auth/authSlice";
import Avatar from "react-avatar";
import { setBarOpen } from "../features/sidebar/sidebarSlice";
// import { clearCart } from "../features/pgslice/pgSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearAuthUser());
        toast.success("Logged Out Successfully");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setAuthUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setAuthUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-xl p-4 mx-2 sm:mx-4 my-4 shadow-[0_8px_32px_rgb(0_0_0/0.5)]">
      <div className="flex items-center justify-between">
        {/* Left Side: Hamburger & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(setBarOpen())}
            // highlight-next-line
            className="p-2 rounded-full hover:bg-gray-700/60 transition-colors duration-300" // <-- REMOVED lg:hidden from here
          >
            <RxHamburgerMenu size={24} className="text-gray-200" />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.VB187cXwkH66uPWT3X34JQHaHa&pid=Api&P=0&h=180"
              alt="logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <h1 className="text-xl sm:text-2xl text-gray-200 font-medium">
              PG-Finder
            </h1>
          </Link>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="/"
            className="text-gray-300 hover:text-white font-medium text-lg transition-colors duration-300"
          >
            Home
          </a>
          <a
            href="/#about"
            className="text-gray-300 hover:text-white font-medium text-lg transition-colors duration-300"
          >
            About
          </a>
          <a
            href="/#contact"
            className="text-gray-300 hover:text-white font-medium text-lg transition-colors duration-300"
          >
            Contact
          </a>
        </nav>

        {/* Right Side: Auth (Desktop) */}
        <div
          className="hidden lg:flex items-center justify-end gap-4"
          style={{ minWidth: "250px" }}
        >
          {user && token ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar
                  src={
                    user.photoURL ||
                    "https://tse3.mm.bing.net/th?id=OIP.btgP01toqugcXjPwAF-k2AHaHa&pid=Api&P=0&h=180"
                  }
                  name={user.displayName}
                  size="40"
                  round={true}
                />
                <h3 className="text-gray-200 font-medium truncate max-w-[100px]">
                  {user.displayName}
                </h3>
              </div>
              <button
                onClick={logOut}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
