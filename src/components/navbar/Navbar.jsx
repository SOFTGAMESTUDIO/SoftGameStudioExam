import React, { Fragment, useContext, useState, useEffect } from "react";
import myContext from "../../context/data/myContext";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";

function Navbar() {
  const context = useContext(myContext);
  const [open, setOpen] = useState(false);
  const [UserName, setUserName] = useState("");

  // Fetch user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.user?.email) {
      setUserName(user.user.email);
    } else {
      setUserName(null);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Sidebar Menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-700 pb-12 shadow-xl">
                {/* Close Button */}
                <div className="flex px-4 pb-2 pt-28 text-xl">
                  <button
                    type="button"
                    className="hover:text-cyan-400 -m-2 inline-flex items-center justify-center rounded-md p-2 text-white bg-black mb-2"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fa-regular fa-circle-xmark"></i>
                    <span className="text-white ml-1 hover:text-cyan-400">Close Menu</span>
                  </button>
                </div>

                {/* Sidebar Menu Links */}
                <div className="block space-y-6 border-t border-gray-200 px-2 py-4 text-2xl">
                  <Link to={user ? "/profile" : "/login"} className="text-white hover:text-cyan-400 flex items-center">
                    <i className="fa-solid fa-user"></i>
                    <span className="ml-1">Account</span>
                  </Link>

                  {UserName === import.meta.env.VITE__ADMIN_EMAIL && (
                    <Link to="/dashboard" className="text-white hover:text-cyan-400 flex items-center">
                      <i className="fa-solid fa-lock"></i>
                      <span className="ml-1">Admin</span>
                    </Link>
                  )}

                  <Link to={user ? "/YOUREXAM" : "/login"} className="text-white hover:text-cyan-400 flex items-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className="ml-1">Your Exam</span>
                  </Link>

                  <Link to={user ? "/OnlineQuiz" : "/login"} className="text-white hover:text-cyan-400 flex items-center">
                    <i className="fa-solid fa-calendar-days"></i>
                    <span className="ml-1">Online Quiz</span>
                  </Link>

                  <Link to="/Result" className="text-white hover:text-cyan-400 flex items-center">
                    <i className="fa-solid fa-square-poll-vertical"></i>
                    <span className="ml-1">Result</span>
                  </Link>

                  {user ? (
                    <button onClick={logout} className="text-white hover:text-cyan-400 flex items-center">
                      <i className="fa-solid fa-right-from-bracket"></i>
                      <span className="ml-1">Logout</span>
                    </button>
                  ) : (
                    <Link to="/signup" className="text-white hover:text-cyan-400 flex items-center">
                      <i className="fa-solid fa-right-to-bracket"></i>
                      <span className="ml-1">Sign Up</span>
                    </Link>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Navbar */}
      <header className="relative bg-gray-700">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
          style={{ backgroundColor: "#282c34" }}
        >
          <div className="flex h-16 items-center">
            {/* Mobile Menu Button */}
            <button className="rounded-md bg-gray-500 p-2 text-white" onClick={() => setOpen(true)}>
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to="/" className="flex">
                <h1 className="hidden sm:block text-2xl font-bold text-white px-2 py-1 rounded">SOFT GAME STUDIO EXAM</h1>
                <h1 className="sm:hidden text-3xl font-bold text-white px-2 py-1 rounded">S G S EXAM</h1>
              </Link>
            </div>

            {/* Right Section */}
            <div className="ml-auto flex items-center lg:space-x-6">
            
                  <div>
                    <Link
                      to={"/"}
                      className="text-white  hover:text-cyan-400  m-2 flex justify-center text-center items-center "
                    >
                      <i class="fa-solid fa-house "></i>
                      
                    </Link>
                  </div>
              
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
