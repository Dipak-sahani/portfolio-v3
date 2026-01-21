import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUser } from "@fortawesome/free-solid-svg-icons";
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

  const startupNbusiness=[{
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
        isEnable: false,
        link: '/pitch-decks'
    },
    {
        id: 4,
        title: "Funding & Investors",
        isEnable: false,
        link: '/funding-investors'
    },
    {
        id: 5,
        title: "Incubators & Accelerators",
        isEnable: false,
        link: '/incubators'
    },
    {
        id: 6,
        title: "Mentorship",
        isEnable: false,
        link: '/mentorship'
    },
    {
        id: 7,
        title: "Case Studies",
        isEnable: true,
        link: '/case-study'
    }]

  const peopleNnetWorking=[
     {
        id: 8,
        title: "Find Co-Founders",
        isEnable: true,
        link: '/users'
    },
    {
        id: 9,
        title: "Developers",
        isEnable: false,
        link: '/developers'
    },
    {
        id: 10,
        title: "Designers",
        isEnable: false,
        link: '/designers'
    },
    {
        id: 11,
        title: "Marketers",
        isEnable: false,
        link: '/marketers'
    },
    {
        id: 12,
        title: "Advisors",
        isEnable: false,
        link: '/advisors'
    },
    {
        id: 13,
        title: "Freelancers",
        isEnable: false,
        link: '/freelancers'
    },
    {
        id: 14,
        title: "Teams",
        isEnable: false,
        link: '/team'
    }
  ]
  const toolsNservice = [
    
   
    {
        id: 15,
        title: "Website Builder",
        isEnable: false,
        link: '/website-builder'
    },
    {
        id: 16,
        title: "Payment Integration",
        isEnable: false,
        link: '/payment'
    },
    {
        id: 17,
        title: "Legal & Compliance",
        isEnable: false,
        link: '/legal-compliance'
    },
    {
        id: 18,
        title: "Accounting & GST",
        isEnable: false,
        link: '/accounting'
    },
    {
        id: 19,
        title: "Marketing Tools",
        isEnable: false,
        link: '/marketing'
    },
    {
        id: 20,
        title: "Analytics",
        isEnable: false,
        link: '/analytics'
    },
    {
        id: 21,
        title: "AI Tools",
        isEnable: false,
        link: '/ai-tool'
    }
];


  const menuItem =
    "block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black transition";

  return (
    <header className="flex items-center  px-6 py-4 bg-white shadow-md relative">
      {/* Left Section: Logo and Title */}
      <div className="flex-1/5 flex-col items-center space-x-2">
        <div className="text-3xl font-bold text-[#3C4044] tracking-tighter leading-none">
          {" "}
          <span className="text-red-500">Be</span>rojgar
        </div>
        <div className="text-3xl font-bold text-black tracking-tighter leading-none">
          Founder
        </div>
      </div>

      {/* Center Section: Navigation Links (Desktop) */}
      <nav className="flex-3/5 hidden md:flex items-center  justify-between  space-x-8 bg-[#3c4044] px-10 h-10 rounded-xl">
        <Link
          to="/"
          className="text-gray-100 hover:text-[#FD7B41] hover:scale-125 transform transition duration-75 font-medium hover:bg-[#3C4044] hover:rounded-xl hover:p-2"
        >
          Home
        </Link>
        {isAuthenticated && (
          <Link
            to="#"
            className="text-gray-100 hover:text-[#FD7B41] font-medium hover:scale-125 transform transition  hover:bg-[#3C4044] hover:rounded-xl hover:p-2"
          >
            Team
          </Link>
        )}
        <Link
          to="#"
          className="text-gray-100 hover:text-[#FD7B41] font-medium hover:scale-125 transform transition hover:bg-[#3C4044] hover:rounded-xl hover:p-2"
        >
          Event
        </Link>
        <Link
          to="create-post"
          className="text-gray-100 hover:text-[#FD7B41] font-medium hover:scale-125 transform transition hover:bg-[#3C4044] hover:rounded-xl hover:p-2"
        >
          Create
        </Link>
        {/* / edited button */}

        {isAuthenticated && (
          <div className="relative inline-block group">
            {/* Hover Area Wrapper */}
            <div className="px-3 py-2">
              <Link
                to="#"
                className="text-gray-100 font-medium transition
                     hover:text-[#FD7B41]
                     hover:scale-110 transform
                     hover:bg-[#3C4044]
                     hover:rounded-xl hover:px-3 hover:py-2"
              >
                More
              </Link>
            </div>

            {/* Dropdown */}
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
                    startupNbusiness.map((val,id)=>(
                         <Link key={id}
                    to={`${val.link}`}
                    className={`${val.isEnable&& 'border-cyan-200 border rounded '} block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black`}
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
                    peopleNnetWorking.map((val,id)=>(
                         <Link key={id}
                    to={`${val.link}`}
                    className={`${val.isEnable&& 'border-cyan-200 border rounded '} block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black`}
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
                    toolsNservice.map((val,id)=>(
                         <Link key={id}
                    to={`${val.link}`}
                    className={`${val.isEnable&& 'border-cyan-200 border rounded '} block px-4 py-3 text-gray-200 hover:bg-[#FD7B41] hover:text-black`}
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
        <div className="flex-1/5">
          {user ? (
            <div className=" hidden md:flex justify-center items-center relative group">
              {/* User Button */}
              <div
                className={`px-6 w-20 h-10 flex items-center justify-center gap-2
              rounded-3xl text-white font-bold
              bg-[#fd7d41d1] ${textColor}
              cursor-pointer`}
              >
                <FontAwesomeIcon icon={faUser} size="16" />
                <span className="text-xl">{firstLetter}</span>
              </div>
              {/* Hover Menu */}
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

                <div className="bg-[#3C4044]  shadow-xl overflow-hidden">
                  <Link to="/dashboard" className={`${menuItem}`}>
                    Dashboard
                  </Link>
                  <Link to="/chat" className={`${menuItem}`}>
                    Messages / Chat
                  </Link>
                  <Link to="/notifications" className={`${menuItem}`}>
                    Notifications
                  </Link>

                  <div className="h-px bg-gray-600 my-1" />

                  <Link to="/create-startup" className={`${menuItem}`}>
                    Create Startup
                  </Link>
                  <Link to="/create-page" className={`${menuItem}`}>
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
        <div className="flex-1/5 hidden md:flex justify-center items-center">
          <Link
            to="/auth"
            className="px-6 py-2 bg-[#FD7B41] text-white font-medium rounded-md hover:bg-[#fd7d41d1] hover:scale-110 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </Link>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-10">
          <div className="flex flex-col px-6 py-4 space-y-4 text-center">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Home
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Team
            </Link>
            <Link
              to="#"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Event
            </Link>
            <Link
              to="/create-post"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              Create Post
            </Link>
            <Link
              to="/more-option"
              className="text-gray-700 hover:text-blue-600 font-medium py-2"
            >
              More
            </Link>
            <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors w-full">
              Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
