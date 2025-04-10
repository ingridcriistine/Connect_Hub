
import React, { useState } from "react";
import { Search, Send, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: number;
  text: string;
  sender: "user" | "other";
  timestamp: string;
}

interface ChatContact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
}

const dummyContacts: ChatContact[] = [
  {
    id: 1,
    name: "Maria Silva",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Thank you for the information!",
    time: "12:30 PM",
    unread: 2,
    isOnline: true,
  },
  {
    id: 2,
    name: "Lucas Mendes",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    lastMessage: "I'll check it out later",
    time: "Yesterday",
    unread: 0,
    isOnline: false,
  },
  {
    id: 3,
    name: "Ana Costa",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    lastMessage: "Can you send me that file?",
    time: "Yesterday",
    unread: 0,
    isOnline: true,
  },
  {
    id: 4,
    name: "João Silva",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "How's the project going?",
    time: "Monday",
    unread: 0,
    isOnline: false,
  },
];

const dummyMessages: ChatMessage[] = [
  {
    id: 1,
    text: "Hi there! How are you doing?",
    sender: "other",
    timestamp: "12:01 PM",
  },
  {
    id: 2,
    text: "I'm good, thanks for asking! How about you?",
    sender: "user",
    timestamp: "12:05 PM",
  },
  {
    id: 3,
    text: "I'm doing well! Just wanted to check in about the Connect Hub project.",
    sender: "other",
    timestamp: "12:10 PM",
  },
  {
    id: 4,
    text: "It's going great! I'm really impressed with the interface so far.",
    sender: "user",
    timestamp: "12:12 PM",
  },
  {
    id: 5,
    text: "That's awesome to hear! Let me know if you need any help.",
    sender: "other",
    timestamp: "12:15 PM",
  },
  {
    id: 6,
    text: "Actually, I was wondering if you have any resources on the API integration?",
    sender: "user",
    timestamp: "12:18 PM",
  },
  {
    id: 7,
    text: "Sure! I'll send you some documentation that might help. Check your email in a bit.",
    sender: "other",
    timestamp: "12:20 PM",
  },
  {
    id: 8,
    text: "Thank you for the information!",
    sender: "user",
    timestamp: "12:30 PM",
  },
];

const Chat: React.FC = () => {
  const [contacts] = useState<ChatContact[]>(dummyContacts);
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(contacts[0]);
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedContact) {
      return;
    }
    
    const message: ChatMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: "Just now",
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    // Simulate reply
    setTimeout(() => {
      const reply: ChatMessage = {
        id: Date.now() + 1,
        text: "Thanks for your message! I'll respond soon.",
        sender: "other",
        timestamp: "Just now",
      };
      
      setMessages(prev => [...prev, reply]);
      
      toast({
        title: "New message",
        description: `${selectedContact.name}: Thanks for your message! I'll respond soon.`,
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto h-screen pt-4 pb-16">
      <div className="flex h-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Contacts sidebar */}
        <div className="w-1/3 border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search contacts..." 
                className="w-full bg-gray-100 border-0 rounded-full py-2 px-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-connectHub-primary"
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-gray-500" />
            </div>
          </div>
          
          <div className="overflow-y-auto h-full pb-16">
            {contacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center p-3 border-b cursor-pointer hover:bg-gray-50 transition ${selectedContact?.id === contact.id ? "bg-gray-100" : ""}`}
              >
                <div className="relative">
                  <img 
                    src={contact.avatar} 
                    alt={contact.name} 
                    className="w-12 h-12 rounded-full"
                  />
                  {contact.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>
                
                <div className="ml-3 flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                </div>
                
                {contact.unread > 0 && (
                  <div className="w-5 h-5 bg-connectHub-primary rounded-full flex items-center justify-center ml-2">
                    <span className="text-white text-xs">{contact.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="w-2/3 flex flex-col">
          {selectedContact ? (
            <>
              <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src={selectedContact.avatar} 
                    alt={selectedContact.name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold">{selectedContact.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedContact.isOnline ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-xs rounded-lg px-4 py-2 ${
                        message.sender === "user" 
                          ? "bg-connectHub-primary text-white rounded-br-none" 
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 border-0 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-connectHub-primary"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="ml-2 bg-connectHub-primary text-white p-2 rounded-full"
                  >
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
