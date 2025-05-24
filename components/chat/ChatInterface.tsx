"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat-store";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, X, Minimize2, Maximize2 } from "lucide-react";

export function ChatInterface() {
  const { messages, sendMessage, isOpen, toggleChat, closeChat } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, isMinimized]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };
  
  // Toggle minimize state
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 flex flex-col",
        "w-[90vw] sm:w-[400px] rounded-lg shadow-lg",
        "bg-card border border-border",
        "transition-all duration-300 ease-in-out",
        isMinimized ? "h-14" : "h-[500px] max-h-[80vh]"
      )}
    >
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <h3 className="font-medium">SecureBank Assistant</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleMinimize}
            aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
          >
            {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={closeChat}
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Chat content - hidden when minimized */}
      {!isMinimized && (
        <>
          {/* Messages area */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
          
          {/* Input area */}
          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}