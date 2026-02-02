import React, { useState, useEffect } from "react";
// import socket from "../../app/socket";
import { ConnectionState } from "../../components/states/ConnnectionState";
import { ConnectionManager } from "../../components/states/ConnectionManager";
import { Events } from "../../components/states/Events";
import { MyForm } from "../../components/states/MyForm";
import { useParams } from "react-router-dom";
import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatDisplayPage from "../../components/chat/ChatDisplayPage";
import { useAuthStore } from "../../store/auth.store";
import ChatApp from "../../components/chat/ShowChat";
import ChatArea from "../../components/chat/ShowChat";
import { getPersonById } from "../../services/people.service";
import { useContacts } from "../../store/contactSelection.store";

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);
  const { id } = useParams();
  // console.log(id);
  const myContacts = useContacts((state) => state.myContacts);
  const [activeContact, setActiveContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useAuthStore((state) => state.user);

  const selectedContactPerson = useContacts(
    (state) => state.selectedContactPerson,
  );
  // console.log(user);

  const [selectedUserId, setSelectedUserId] = useState(id || null);

  const getPerson = async (id) => {
    try {
      // console.log(myContacts);

      const isUserPresentInContact = myContacts.find(
        (user) => user?.user?._id == id,
      );

      // console.log(isUserPresentInContact);

      let formattedContacts;

      if (!isUserPresentInContact) {
        console.log("user not in contact");

        const res = await getPersonById(id);
        // console.log(res);

        formattedContacts = {
          id: res?.data?.user._id,
          name: res?.data?.user.fullName,
          avatar: res?.data?.user.fullName
            .split(" ")
            .map((n) => n[0])
            .join(""),
          email: res?.data?.user.email?.toLowerCase(),
          status: ["online", "away", "offline"][Math.floor(Math.random() * 3)],
          lastSeen: [
            "Just now",
            "2 min ago",
            "5 min ago",
            "30 min ago",
            "2 hours ago",
          ][Math.floor(Math.random() * 5)],
          unread: Math.floor(Math.random() * 4),
          phone: res?.data?.user.phone,
          website: res?.data?.user.website,
          company: res?.data?.user.company?.name,
        };

        setActiveContact(formattedContacts);
        selectedContactPerson(formattedContacts);
      }

      else{formattedContacts = {
        id: isUserPresentInContact?.user?._id,
        name: isUserPresentInContact?.user?.fullName,
        avatar: isUserPresentInContact?.user?.fullName
          .split(" ")
          .map((n) => n[0])
          .join(""),
        email: isUserPresentInContact?.user?.email?.toLowerCase(),
        status: ["online", "away", "offline"][Math.floor(Math.random() * 3)],
        lastSeen: [
          "Just now",
          "2 min ago",
          "5 min ago",
          "30 min ago",
          "2 hours ago",
        ][Math.floor(Math.random() * 5)],
        unread: Math.floor(Math.random() * 4),
        phone: isUserPresentInContact?.user?.phone,
        website: isUserPresentInContact?.user?.website,
        company: isUserPresentInContact?.user?.company?.name,
        conversationId: isUserPresentInContact?.conversationId,
      };

      setActiveContact(formattedContacts);
        selectedContactPerson(formattedContacts);}
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(selectedUserId);
    if (id) {
      getPerson(id);
    }
  }, [selectedUserId]);

  const onSelect = (data) => {
    console.log("hello from chat", data);
    setSelectedUserId(data);
  };

  const handleContactSelect = (contact) => {
    setActiveContact(contact);
  };

  const handleSendMessage = (message, conversationId) => {
    // console.log(`Message sent to contact ${conversationId}: ${message}`);
    // In a real app, you would send this to your backend API
  };

  return (
    <div className="">
      {/* <div>
        <ChatSidebar  onSelectChat={onSelect} />
      </div>
      <ConnectionState isConnected={isConnected} /> */}
      {/* <Events events={fooEvents} /> */}
      {/* <ConnectionManager /> */}

      {/* {
        selectedUserId&& <>  <ChatDisplayPage selectedUserId={selectedUserId} currentUserId={user._id} /></>
      } */}

      <div className="flex flex-col md:flex-row h-screen bg-gray-50">
        {/* Sidebar - always visible */}
        <div
          className={`${activeContact ? "md:w-1/4" : "w-full"} md:w-1/4 md:block`}
        >
          <ChatSidebar
            onContactSelect={handleContactSelect}
            activeContactId={activeContact?.id}
          />
        </div>

        {/* Chat area - hidden on mobile when no contact selected */}
        {activeContact && (
          <div className="flex-1 w-full">
            <ChatArea
              activeContact={activeContact}
              onSendMessage={handleSendMessage}
            />
          </div>
        )}

        {/* Mobile overlay when chat is active */}
        {activeContact && (
          <div className="md:hidden fixed inset-0 bg-white z-50">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 flex items-center">
                <button
                  onClick={() => setActiveContact(null)}
                  className="mr-3 text-gray-500"
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
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>
                <h2 className="text-lg font-semibold">Chat</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <ChatArea
                  activeContact={activeContact}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
