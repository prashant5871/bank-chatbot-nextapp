"use client";

import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat-store";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export function ChatButton({ className, variant = "default" }: ChatButtonProps) {
  const { openChat } = useChat();
  
  return (
    <Button
      onClick={openChat}
      className={cn("gap-2 transition-all duration-300 hover:scale-105", className)}
      variant={variant}
    >
      <MessageSquare className="h-4 w-4" />
      <span>Start Chat</span>
    </Button>
  );
}