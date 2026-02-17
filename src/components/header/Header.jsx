import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import ThemeToggle from "../component/ThemeToggle";
import { useNotificationStore } from "../../store/notification.store";
import NotificationBell from "../notifications/NotificationBell";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const slug = useLocation();
  // console.log(slug.pathname);
  const colors = [
    "text-red-900",
    "text-blue-900",
    "text-green-900",
    "text-purple-900",
    "text-pink-900",
    "text-yellow-900",
    "text-indigo-900",
  ];

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user);
  const notifications = useNotificationStore((state) => state.notifications);

  const markNotificationRead = useNotificationStore(
    (state) => state.markNotificationRead,
  );

  const markAllRead = useNotificationStore((state) => state.markAllRead);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  // console.log(notifications);

  const firstLetter = user?.fullName?.charAt(0).toUpperCase();

  const colorIndex =
    user?.fullName
      ?.split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  const textColor = colors[colorIndex];



  // more options

  const startupNbusiness = [{
    id: 1,
    title: "Startup Ideas",
    isEnable: true,
    link: '/startup-idea'
  },
  {
    id: 2,
    title: "Business Models",
    isEnable: true,
    link: '/business-model'
  },
  {
    id: 3,
    title: "Pitch Decks",
    isEnable: true,
    link: '/pitch-decks'
  },
  {
    id: 4,
    title: "Funding & Investors",
    isEnable: true,
    link: '/funding-investors'
  },
  {
    id: 5,
    title: "Incubators & Accelerators",
    isEnable: true,
    link: '/incubators'
  },
  {
    id: 6,
    title: "Mentorship",
    isEnable: true,
    link: '/mentorship'
  },
  {
    id: 7,
    title: "Case Studies",
    isEnable: true,
    link: '/case-study'
  }]

  const peopleNnetWorking = [
    {
      id: 8,
      title: "Find Co-Founders",
      isEnable: true,
      link: '/users'
    },
    {
      id: 9,
      title: "Developers",
      isEnable: true,
      link: '/developers'
    },
    {
      id: 10,
      title: "Designers",
      isEnable: true,
      link: '/designers'
    },
    {
      id: 11,
      title: "Marketers",
      isEnable: true,
      link: '/marketers'
    },
    {
      id: 12,
      title: "Advisors",
      isEnable: true,
      link: '/advisors'
    },
    {
      id: 13,
      title: "Freelancers",
      isEnable: true,
      link: '/freelancers'
    },
    {
      id: 14,
      title: "Teams",
      isEnable: true,
      link: '/team'
    }
  ]
  const toolsNservice = [


    {
      id: 15,
      title: "Website Builder",
      isEnable: true,
      link: '/website-builder'
    },
    {
      id: 16,
      title: "Payment Integration",
      isEnable: true,
      link: '/payment'
    },
    {
      id: 17,
      title: "Legal & Compliance",
      isEnable: true,
      link: '/legal-compliance'
    },
    {
      id: 18,
      title: "Accounting & GST",
      isEnable: true,
      link: '/accounting'
    },
    {
      id: 19,
      title: "Marketing Tools",
      isEnable: true,
      link: '/marketing'
    },
    {
      id: 20,
      title: "Analytics",
      isEnable: true,
      link: '/analytics'
    },
    {
      id: 21,
      title: "AI Tools",
      isEnable: true,
      link: '/ai-tool'
    }
  ];


  const menuItem =
    "block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black transition";

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 w-full">

          {/* Logo Section */}
          <div className="flex-1 md:w-[10%] flex justify-start">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src='/images/logo.png'
                alt="Berojgar Founder Logo"
                className="w-8 h-12 sm:w-10 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <div className="flex flex-col leading-none">
                <h1 className="text-lg sm:text-2xl font-bold text-[#3C4044] dark:text-gray-100 tracking-tight flex flex-col leading-none">
                  <span><span className="text-red-500">Be</span>rojgar</span>
                  <span className="text-lg sm:text-2xl font-bold text-[#3C4044] dark:text-gray-300 tracking-tight">Founder</span>
                </h1>
              </div>
            </Link>
          </div>

          {/* Center Section: Navigation Links (Desktop) */}
          <div className="hidden md:flex md:w-[80%] justify-center">
            <nav className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full border border-gray-200 dark:border-gray-700">
              <Link
                to="/"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 relative group ${slug.pathname === '/' ? 'bg-white dark:bg-gray-700 text-[#FD7B41] shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] dark:hover:text-white'}`}
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/startup-profile"
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${slug.pathname === '/startup-profile' ? 'bg-white dark:bg-gray-700 text-[#FD7B41] shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] dark:hover:text-white'}`}
                >
                  Startup
                </Link>
              )}
              <Link
                to="/event"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${slug.pathname === '/event' ? 'bg-white dark:bg-gray-700 text-[#FD7B41] shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] dark:hover:text-white'}`}
              >
                Event
              </Link>
              <Link
                to="/users"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${slug.pathname === '/explore' ? 'bg-white dark:bg-gray-700 text-[#FD7B41] shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] dark:hover:text-white'}`}
              >
                Find
              </Link>
              <Link
                to="/create-post"
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${slug.pathname === '/create-post' ? 'bg-white dark:bg-gray-700 text-[#FD7B41] shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] dark:hover:text-white'}`}
              >
                Create
              </Link>

              {isAuthenticated && (
                <div className="relative inline-block group">
                  {/* Hover Area Wrapper */}
                  <div className="px-3 py-2">
                    <Link
                      to="#"
                      className="px-5 py-2 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-[#FD7B41] dark:hover:text-white transition-all duration-200"
                    >
                      More
                    </Link>
                  </div>

                  {/* Dropdown - Kept as is, positioned relative to this container */}
                  <div
                    className="
                absolute left-1/2 -translate-x-1/2 top-full w-150
                pt-3    
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-opacity duration-300 z-10
              "
                  >
                    <div className="flex pt-4 bg-[#3C4044] rounded-xl shadow-xl overflow-hidden text-gray-200 justify-around">
                      <div className="   \">
                        <h1 className="font-semibold text-gray-400 uppercase">
                          🚀 Startup & Business
                        </h1>
                        {
                          startupNbusiness.map((val, id) => (
                            <Link key={id}
                              to={`${val.link}`}
                              className={`${val.isEnable && 'border-cyan-200 border rounded '} block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black`}
                            >
                              {val.title}
                            </Link>
                          ))
                        }

                      </div>
                      <div>
                        <h1 className="font-semibold text-gray-400 uppercase">
                          👥People & Networking
                        </h1>
                        {
                          peopleNnetWorking.map((val, id) => (
                            <Link key={id}
                              to={`${val.link}`}
                              className={`${val.isEnable && 'border-cyan-200 border rounded '} block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black`}
                            >
                              {val.title}
                            </Link>
                          ))
                        }

                      </div>
                      <div>
                        <h1 className="font-semibold text-gray-400 uppercase">
                          🛠 Tools & Services
                        </h1>
                        {
                          toolsNservice.map((val, id) => (
                            <Link key={id}
                              to={`${val.link}`}
                              className={`${val.isEnable && 'border-cyan-200 border rounded '} block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black`}
                            >
                              {val.title}
                            </Link>
                          ))
                        }

                      </div>
                    </div>
                  </div>
                </div>
              )}
            </nav>
            {/* Mobile Title if needed or spacer */}
          </div>

          {/* Right Section: Login/User */}
          <div className="w-auto md:w-[10%] flex justify-end items-center gap-2">

            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {notifications?.length > 0 && (
              <NotificationBell
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkRead={(id) => markNotificationRead(id)}
                onMarkAllRead={() => markAllRead()}
              />
            )}

            {/* Right Section: Login Button */}
            {slug.pathname == "/auth" || isAuthenticated ? (
              <div className="">
                {user ? (
                  <div className=" hidden md:flex justify-end items-center relative group">
                    {/* User Button */}
                    <div
                      className={`w-10 h-10 flex items-center justify-center
                    rounded-full text-white font-bold
                    bg-[#fd7d41d1] ${textColor}
                    cursor-pointer shadow-md hover:shadow-lg transition-shadow`}
                    >
                      <span className="text-lg">{firstLetter}</span>
                    </div>
                    {/* Hover Menu - Aligned to right */}
                    <div
                      className="
          absolute top-full right-0 mt-2 w-56
          opacity-0 invisible
          group-hover:opacity-100 group-hover:visible
          transition-all duration-300 ease-out
          z-50
          pointer-events-none group-hover:pointer-events-auto text-gray-200
        "
                    >
                      {/* INVISIBLE HOVER BRIDGE */}
                      <div className="absolute -top-4 left-0 w-full h-4"></div>

                      <div className="bg-[#3C4044]  shadow-xl overflow-hidden rounded-lg">
                        <Link to="/dashboard" className={`${menuItem}`}>
                          Dashboard
                        </Link>
                        <Link to="/chat" className={`${menuItem}`}>
                          Messages / Chat
                        </Link>


                        <div className="h-px bg-gray-600 my-1" />

                        <Link to="/startup-profile" className={`${menuItem}`}>
                          Startup
                        </Link>
                        <Link to="/page-builder" className={`${menuItem}`}>
                          Create Page / Product
                        </Link>

                        <div className="h-px bg-gray-600 my-1" />

                        <Link to="/profile" className={`${menuItem}`}>
                          Profile
                        </Link>
                        <Link to="/settings" className={`${menuItem}`}>
                          Settings
                        </Link>

                        <div className="h-px bg-gray-600 my-1" />

                        <button
                          onClick={async () => await logout()}
                          className={`${menuItem} text-red-400 hover:bg-red-500 hover:text-white w-full text-left`}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="px-6 py-2 "></div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex justify-end items-center">
                <Link
                  to="/auth"
                  className="px-5 py-2 bg-[#FD7B41] text-white font-medium rounded-full hover:bg-[#fd7d41d1] hover:scale-105 transition-all shadow-md text-sm"
                >
                  Login
                </Link>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg md:hidden z-10 transition-all duration-300 ease-in-out border-t dark:border-gray-700 overflow-y-auto max-h-[85vh]">
          <div className="flex flex-col px-6 py-4 space-y-4 text-center">
            <div className="flex justify-end mb-2">
              <ThemeToggle />
            </div>
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/startup-profile"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Startup
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/chat"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Messages
                </Link>
                <Link
                  to="/event"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Event
                </Link>
                {/* <Link
                  to="/explore"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore
                </Link> */}
                <Link
                  to="/create-post"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create
                </Link>

                {/* Mobile More Links */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Startup & Business</p>
                  {startupNbusiness.map((item) => (
                    item.isEnable && (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">People & Networking</p>
                  {peopleNnetWorking.map((item) => (
                    item.isEnable && (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tools & Services</p>
                  {toolsNservice.map((item) => (
                    item.isEnable && (
                      <Link
                        key={item.id}
                        to={item.link}
                        className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition text-sm"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  ))}
                </div>

                <div className="h-px bg-gray-200 my-1" />
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="px-6 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition-colors w-full"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* <Link
                  to="/explore"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore
                </Link> */}
                <Link
                  to="/event"
                  className="text-gray-700 hover:text-blue-600 font-medium py-2 hover:bg-gray-100 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Event
                </Link>
                <Link
                  to="/auth"
                  className="px-6 py-2 bg-[#FD7B41] text-white font-medium rounded-md hover:bg-[#e06b36] transition-colors w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
