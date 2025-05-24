import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ChatInterface = ({ productId, sellerId, isOnline }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [pendingMessages, setPendingMessages] = useState([]);
  const messagesEndRef = useRef(null);
  
  // Mock user data
  const currentUser = {
    id: "user-123",
    name: "You",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  };

  // Mock seller data
  const seller = {
    id: sellerId,
    name: "Rajesh Kumar",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  };

  // Initial messages
  useEffect(() => {
    // Simulate loading messages
    setTimeout(() => {
      setMessages([
        {
          id: "msg-1",
          senderId: seller.id,
          text: "Hello! Thank you for your interest in my organic rice seeds. How can I help you today?",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
          status: "read"
        }
      ]);
    }, 1000);
  }, [seller.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate seller typing
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].senderId === currentUser.id) {
      setIsTyping(true);
      
      const typingTimeout = setTimeout(() => {
        setIsTyping(false);
        
        // Add seller response
        const responses = [
          "Yes, these are premium quality organic rice seeds. They have a germination rate of over 95%.",
          "The seeds are certified organic and perfect for sustainable farming.",
          "I can offer a small discount if you're buying in bulk. How many bags are you interested in?",
          "Would you like to schedule a time to visit and see the seeds in person?",
          "I can arrange delivery to your location if you're interested."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          id: `msg-${Date.now()}`,
          senderId: seller.id,
          text: randomResponse,
          timestamp: new Date(),
          status: "sent"
        }]);
      }, 3000);
      
      return () => clearTimeout(typingTimeout);
    }
  }, [messages, currentUser.id, seller.id]);

  // Process pending messages when coming back online
  useEffect(() => {
    if (isOnline && pendingMessages.length > 0) {
      const processPendingMessages = async () => {
        // Simulate sending pending messages
        for (const pendingMsg of pendingMessages) {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === pendingMsg.id 
                ? { ...msg, status: "sent" } 
                : msg
            )
          );
          
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        setPendingMessages([]);
      };
      
      processPendingMessages();
    }
  }, [isOnline, pendingMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: message,
      timestamp: new Date(),
      status: isOnline ? "sending" : "pending"
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    if (!isOnline) {
      setPendingMessages(prev => [...prev, newMessage]);
    } else {
      // Simulate message being sent
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id 
              ? { ...msg, status: "sent" } 
              : msg
          )
        );
        
        // Simulate message being delivered
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id 
                ? { ...msg, status: "delivered" } 
                : msg
            )
          );
          
          // Simulate message being read
          setTimeout(() => {
            setMessages(prev => 
              prev.map(msg => 
                msg.id === newMessage.id 
                  ? { ...msg, status: "read" } 
                  : msg
              )
            );
          }, 2000);
        }, 1000);
      }, 1000);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Icon name="Clock" size={14} className="text-text-tertiary" />;
      case "sending":
        return <Icon name="ArrowUpCircle" size={14} className="text-text-tertiary animate-pulse" />;
      case "sent":
        return <Icon name="Check" size={14} className="text-text-tertiary" />;
      case "delivered":
        return <Icon name="CheckCheck" size={14} className="text-text-tertiary" />;
      case "read":
        return <Icon name="CheckCheck" size={14} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex mb-4 ${
                msg.senderId === currentUser.id ? "justify-end" : "justify-start"
              }`}
            >
              {msg.senderId !== currentUser.id && (
                <div className="flex-shrink-0 mr-3">
                  <Image
                    src={seller.avatar}
                    alt={seller.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
              <div className={`max-w-[70%]`}>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    msg.senderId === currentUser.id
                      ? "bg-primary text-white rounded-br-none" :"bg-surface text-text-primary rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <div
                  className={`flex items-center mt-1 text-xs text-text-tertiary ${
                    msg.senderId === currentUser.id ? "justify-end" : "justify-start"
                  }`}
                >
                  <span>{formatTime(msg.timestamp)}</span>
                  {msg.senderId === currentUser.id && (
                    <span className="ml-1">{getStatusIcon(msg.status)}</span>
                  )}
                </div>
              </div>
              {msg.senderId === currentUser.id && (
                <div className="flex-shrink-0 ml-3">
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="flex mb-4 justify-start"
            >
              <div className="flex-shrink-0 mr-3">
                <Image
                  src={seller.avatar}
                  alt={seller.name}
                  className="w-8 h-8 rounded-full"
                />
              </div>
              <div className="bg-surface rounded-lg px-4 py-3 rounded-bl-none">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                    className="w-2 h-2 bg-text-tertiary rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                    className="w-2 h-2 bg-text-tertiary rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                    className="w-2 h-2 bg-text-tertiary rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-border p-4">
        <div className="flex items-center">
          <button
            type="button"
            className="p-2 text-text-secondary hover:text-primary transition-colors"
            aria-label="Attach file"
          >
            <Icon name="Paperclip" size={20} />
          </button>
          <div className="flex-1 mx-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 rounded-full border border-border focus:ring-2 focus:ring-primary focus:outline-none"
              disabled={!isOnline && pendingMessages.length > 0}
            />
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className={`p-2 rounded-full ${
              message.trim()
                ? "bg-primary text-white" :"bg-surface text-text-tertiary"
            } transition-colors`}
            aria-label="Send message"
          >
            <Icon name="Send" size={20} />
          </button>
        </div>
        {!isOnline && (
          <p className="text-xs text-warning mt-2 flex items-center">
            <Icon name="AlertTriangle" size={12} className="mr-1" />
            You're offline. Messages will be sent when you're back online.
          </p>
        )}
        {isOnline && pendingMessages.length > 0 && (
          <p className="text-xs text-primary mt-2 flex items-center">
            <Icon name="RefreshCw" size={12} className="mr-1 animate-spin" />
            Sending {pendingMessages.length} pending message(s)...
          </p>
        )}
      </form>
    </div>
  );
};

export default ChatInterface;