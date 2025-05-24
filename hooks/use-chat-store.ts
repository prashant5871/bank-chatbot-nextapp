"use client";

import { create } from "zustand";
import { generateId, type ChatMessage } from "@/lib/chat-data";

interface ChatStore {
  messages: ChatMessage[];
  isOpen: boolean;
  addMessage: (content: string, sender: "user" | "bot") => void;
  addRawMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, newContent: string) => void;
  toggleChat: () => void;
  closeChat: () => void;
  openChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      id: generateId(),
      content: "Hello! I'm your SecureBank virtual assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ],
  isOpen: false,

  addMessage: (content, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: generateId(),
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    })),

  addRawMessage: (message: ChatMessage) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateMessage: (id, newContent) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content: newContent } : msg
      ),
    })),

  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  closeChat: () => set({ isOpen: false }),
  openChat: () => set({ isOpen: true }),
}));

// Hook to manage chat actions
export function useChat() {
  const {
    messages,
    addMessage,
    addRawMessage,
    updateMessage,
    isOpen,
    toggleChat,
    closeChat,
    openChat,
  } = useChatStore();

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // 1. Add user message
    addMessage(content, "user");

    // 2. Add temporary loader message
    const loadingId = generateId();
    const loadingMessage: ChatMessage = {
      id: loadingId,
      content: "Typing...",
      sender: "bot",
      timestamp: new Date(),
    };
    addRawMessage(loadingMessage);

    try {
      // 3. Send user input to /api/ask endpoint
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: content }),
      });

      const data = await response.json();

      // 4. Replace loader with actual bot response
      updateMessage(loadingId, data.answer || "Sorry, I couldn't understand that.");
    } catch (error) {
      console.error("Failed to get response from /api/ask:", error);
      updateMessage(loadingId, "Sorry, something went wrong. Please try again.");
    }
  };

  return {
    messages,
    sendMessage,
    isOpen,
    toggleChat,
    closeChat,
    openChat,
  };
}
