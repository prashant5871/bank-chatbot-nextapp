"use client";

import { useEffect, useRef } from "react";
import { type ChatMessage } from "@/lib/chat-data";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { content, sender, timestamp } = message;
  const messageRef = useRef<HTMLDivElement>(null);
  
  // Scroll to message when it's added
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  return (
    <div
      ref={messageRef}
      className={cn(
        "flex items-start gap-2 mb-4 animate-in fade-in-0 slide-in-from-bottom-3 duration-300",
        sender === "bot" ? "mr-12" : "ml-12 flex-row-reverse"
      )}
    >
      <div 
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full shrink-0",
          sender === "bot" 
            ? "bg-primary/10 text-primary" 
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {sender === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
      </div>
      
      <div
        className={cn(
          "px-4 py-3 rounded-lg",
          sender === "bot" 
            ? "bg-muted" 
            : "bg-primary text-primary-foreground"
        )}
      >
        <p className="text-sm">{content}</p>
        <span className="text-[10px] opacity-70 mt-1 block">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}