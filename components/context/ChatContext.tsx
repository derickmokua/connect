"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Message {
    role: "user" | "model";
    text: string;
}

interface ChatContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    messages: Message[];
    addMessage: (role: "user" | "model", text: string) => void;
    openChat: () => void;
    closeChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", text: "Karibu! Welcome to KukuConnect. I'm your farm assistant, here to help you succeed with healthy chicks, expert advice, and practical solutions. Ask me anything about poultry farming, vaccination, feeding, or farm management!" },
    ]);

    const addMessage = (role: "user" | "model", text: string) => {
        setMessages((prev) => [...prev, { role, text }]);
    };

    const openChat = () => setIsOpen(true);
    const closeChat = () => setIsOpen(false);

    return (
        <ChatContext.Provider value={{ isOpen, setIsOpen, messages, addMessage, openChat, closeChat }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChat() {
    const context = useContext(ChatContext);
    if (context === undefined) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
}
