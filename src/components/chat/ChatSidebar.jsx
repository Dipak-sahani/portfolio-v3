import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faSyncAlt,
  faEdit,
  faTimes,
  faExclamationTriangle,
  faUsers,
  faRedo,
  faBuilding,
  faCircle,
  faCog,
  faSignOutAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';

import { getContact } from '../../services/message.service.js'
import { useContacts } from '../../store/contactSelection.store.js';

const ChatSidebar = ({ onContactSelect, activeContactId }) => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { getContactCall, contactLoading, selectedContactPerson } = useContacts()
  const myContacts = useContacts((state) => state.myContacts)
  // console.log(myContacts);

  // Fetch current user info
  const fetchCurrentUser = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();

      setCurrentUser({
        id: userData.id,
        name: userData.name,
        avatar: userData.name.split(' ').map(n => n[0]).join(''),
        status: 'online',
        email: userData.email
      });
    } catch (err) {
      console.error('Error fetching user:', err);
      setCurrentUser({
        id: 1,
        name: 'You',
        avatar: 'ME',
        status: 'online',
        email: 'user@example.com'
      });
    }
  };

  useEffect(() => {
    formateContact()
  }, [myContacts])


  const formateContact = () => {

    const formattedContacts = myContacts.map(data => ({
      id: data?.user?._id,
      username: data?.user?.username,
      name: data?.user?.fullName,
      avatar: data?.user?.fullName.split(' ').map(n => n[0]).join(''),
      email: data?.user?.email?.toLowerCase(),
      status: ['online', 'away', 'offline'][Math.floor(Math.random() * 3)],
      lastSeen: ['Just now', '2 min ago', '5 min ago', '30 min ago', '2 hours ago'][Math.floor(Math.random() * 5)],
      unread: Math.floor(Math.random() * 4),
      phone: data?.user?.phone,
      website: data?.user?.website,
      company: data?.user?.company?.name,
      conversationId: data?.conversationId

    }));

    setContacts(formattedContacts);


  }


  // Fetch contacts from API
  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getContactCall();
      // console.log(response);

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // const data = await response.json();
      // console.log(res);




      // REMOVED: No longer automatically select first contact
      // Let the user click to select a contact

    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again later.');

      const fallbackContacts = [
        { id: 1, name: 'John Doe', avatar: 'JD', email: 'john@example.com', status: 'online', lastSeen: 'Just now', unread: 2 },
        { id: 2, name: 'Alice Smith', avatar: 'AS', email: 'alice@example.com', status: 'online', lastSeen: '2 min ago', unread: 0 },
        { id: 3, name: 'Robert Johnson', avatar: 'RJ', email: 'robert@example.com', status: 'away', lastSeen: '30 min ago', unread: 1 },
        { id: 4, name: 'Emily Davis', avatar: 'ED', email: 'emily@example.com', status: 'offline', lastSeen: '2 hours ago', unread: 0 },
        { id: 5, name: 'Michael Wilson', avatar: 'MW', email: 'michael@example.com', status: 'online', lastSeen: 'Just now', unread: 0 },
      ];
      setContacts(fallbackContacts);
    } finally {
      setLoading(false);
    }
  };

  // Handle contact search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact =>
    contact?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
    contact?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  // Handle contact click
  const handleContactClick = (contact) => {
    onContactSelect(contact);
    selectedContactPerson(contact)
  };

  // Refresh contacts
  const handleRefresh = () => {
    fetchContacts();
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCurrentUser();
    fetchContacts();

    // Set up polling for new messages (every 30 seconds)
    const intervalId = setInterval(() => {
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          Math.random() > 0.7
            ? { ...contact, unread: contact.unread + 1 }
            : contact
        )
      );
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  // Status text mapping
  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
      default: return 'Offline';
    }
  };

  // Loading skeleton component
  const ContactSkeleton = () => (
    <div className="p-4 border-b border-gray-100 animate-pulse">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gray-300"></div>
        <div className="ml-3 flex-1">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );




  return (
    <div className="w-full bg-[#DDDCDB] dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full transition-colors duration-300">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Messages</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRefresh}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="Refresh contacts"
            >
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-blue-500 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="New conversation"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative mt-4">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>

        {/* Contact count */}
        <div className="mt-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            {searchTerm
              ? `Found ${filteredContacts.length} contact${filteredContacts.length !== 1 ? 's' : ''}`
              : `${contacts.length} contacts`
            }
          </span>

        </div>
      </div>

      {/* Contacts list */}
      {
        <div className="flex-1 overflow-y-auto">
          {contactLoading ? (
            <>
              {[1, 2, 3, 4, 5].map(n => (
                <ContactSkeleton key={n} />
              ))}
            </>
          ) : error ? (
            <div className="p-4 text-center">
              <div className="text-red-500 mb-2">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-2xl" />
              </div>
              <p className="text-red-500 mb-3">{error}</p>
              <button
                onClick={fetchContacts}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <FontAwesomeIcon icon={faRedo} className="mr-2" />
                Try Again
              </button>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-4 text-center">
              <div className="text-gray-400 mb-2">
                <FontAwesomeIcon icon={faUsers} className="text-2xl" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? `No contacts found for "${searchTerm}"`
                  : 'No contacts available'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-blue-500 hover:text-blue-600"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredContacts.map(contact => (
              <div
                key={contact.id}
                className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${activeContactId === contact.id ? 'bg-blue-50 dark:bg-gray-700 border-l-4 border-l-blue-500' : ''}`}
                onClick={() => handleContactClick(contact)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gray-400"
                      style={{
                        backgroundColor: `hsl(${contact.id * 137.5 % 360}, 70%, 60%)`
                      }}
                    >
                      {/* {contact.avatar} */}
                      <FontAwesomeIcon icon={faUser} />
                    </div>
                    {/* <div 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(contact.status)}`}
                    title={getStatusText(contact.status)}
                  ></div> */}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">{contact.name}</h3>

                    </div>

                    {contact.company && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                        <FontAwesomeIcon icon={faBuilding} className="mr-1" />
                        {contact.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>}


    </div>
  );
};

export default ChatSidebar;