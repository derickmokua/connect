"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
    role: "user" | "model";
    text: string;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "model", text: "Karibu! 🐔 I'm your KukuConnect Assistant. I'm here to help you raise healthy, profitable Kuroiler chickens. Ask me about vaccination, feeding, or disease management!" },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
        } catch (error: any) {
            console.error("Chat Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "model", text: error.message || "Sorry, I'm having trouble connecting right now. Please try again later." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full bg-[#8B4513] text-white shadow-lg hover:bg-[#6B4F4F] transition-all z-40 ${isOpen ? "hidden" : "flex"
                    }`}
            >
                <MessageCircle size={28} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-6 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-[#8B4513] p-4 flex justify-between items-center text-white">
                            <h3 className="font-semibold flex items-center gap-2">
                                <MessageCircle size={20} /> Kuku Assistant
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-[#6B4F4F] rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FFFBEA]">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                            ? "bg-[#8B4513] text-white rounded-br-none"
                                            : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                                            } whitespace-pre-wrap break-words`}
                                    >
                                        <ReactMarkdown
                                            remarkPlugins={[remarkGfm]}
                                            components={{
                                                ul: (props) => <ul className="list-disc ml-4 my-2" {...props} />,
                                                ol: (props) => <ol className="list-decimal ml-4 my-2" {...props} />,
                                                li: (props) => <li className="my-1" {...props} />,
                                                p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                                                strong: (props) => <strong className="font-bold" {...props} />,
                                                a: (props) => <a className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                            }}
                                        >
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm">
                                        <Loader2 className="w-5 h-5 animate-spin text-[#8B4513]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    sendMessage();
                                }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask Kuku Assistant..."
                                    className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FFA64D] text-sm"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-2 bg-[#8B4513] text-white rounded-full hover:bg-[#6B4F4F] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Safety Disclaimer */}
                        <div className="bg-gray-100 p-2 text-[10px] text-gray-500 text-center border-t border-gray-200">
                            I am an AI assistant. For serious veterinary emergencies, contact a local professional immediately.
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
