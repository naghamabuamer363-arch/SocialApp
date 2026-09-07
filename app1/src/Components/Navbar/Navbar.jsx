import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContxt } from '../Context/AuthContext/AuthContxt'

export default function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const { userToken, setuserToken } = useContext(AuthContxt)

  const navgiate = useNavigate()

  // Logout
  function logout() {
    localStorage.removeItem('token')
    setuserToken(null)
    navgiate('/')
  }

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b-pink-600 border-default">

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="flex-shrink-0 text-pink-500 hover:text-pink-500 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </span>
            <span className="self-center text-2xl font-bold text-heading font-semibold whitespace-nowrap text-pink-600">
              Social App
            </span>

          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>

            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>


          {/* Navbar Links */}
          <div
            className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}
            id="navbar-default"
          >

            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">

              {userToken ? (
                <>
                  {/* Home */}
                  <li>
                    <NavLink
                      to="/home"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-pink-600 font-medium transition"
                    >
                      Home
                    </NavLink>
                  </li>


                  {/* Profile */}
                  <li>
                    <NavLink
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-pink-600 font-medium transition"
                    >
                      Profile
                    </NavLink>
                  </li>


                  {/* Change Password */}
                  <li>
                    <NavLink
                      to="/change-password"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-pink-600 font-medium transition"
                    >
                      Change Password
                    </NavLink>
                  </li>


                  {/* Logout */}
                  <li>
                    <button
                      onClick={logout}
                      className="text-gray-700 hover:text-pink-600 font-medium transition"
                    >
                      Logout
                    </button>
                  </li>

                </>
              ) : (
                <>
                  {/* Sign In */}
                  <li>
                    <NavLink
                      to="/signin"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-pink-600 font-medium transition"
                    >
                      Sign In
                    </NavLink>
                  </li>


                  {/* Sign Up */}
                  <li>
                    <NavLink
                      to="/"
                      onClick={() => setIsOpen(false)}
                      className="text-gray-700 hover:text-pink-600 font-medium transition"
                    >
                      Sign Up
                    </NavLink>
                  </li>

                </>
              )}

            </ul>

          </div>

        </div>

      </nav>
    </>
  )
}