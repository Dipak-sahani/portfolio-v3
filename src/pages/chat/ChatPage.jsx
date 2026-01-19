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

export default function Chat() {
  const [isConnected, setIsConnected] = useState(false);
  const [fooEvents, setFooEvents] = useState([]);
  const { id } = useParams();
  const [activeContact, setActiveContact] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

  const user=useAuthStore((state)=>state.user);
  console.log(user);

  const [selectedUserId, setSelectedUserId]=useState(id||null);
  
  useEffect(()=>{
    console.log(selectedUserId);
    if (id) {
      setActiveContact(true);
      
    }
    
  },[selectedUserId])
  

 
    const onSelect=(data)=>{
      console.log("hello from chat",data);
      setSelectedUserId(data)
      
    }


    
  const handleContactSelect = (contact) => {
    setActiveContact(contact);
  

  };

  const handleSendMessage = (message, conversationId) => {
    console.log(`Message sent to contact ${conversationId}: ${message}`);

    

    
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
      <div className={`${activeContact ? 'md:w-1/4' : 'w-full'} md:w-1/4 md:block`}>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
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
