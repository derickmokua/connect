"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Loader2, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useChat } from "@/components/context/ChatContext";

export default function AssistantPage() {
    const { messages, addMessage } = useChat();
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        addMessage("user", userMessage);
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

            addMessage("model", data.reply);
        } catch (error: any) {
            console.error("Chat Error:", error);
            addMessage("model", error.message || "Sorry, I'm having trouble connecting right now. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col pt-20">
            <Navbar />
            
            <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-6 flex flex-col h-[calc(100vh-80px)]">
                {/* Header */}
                <div className="bg-white p-4 rounded-t-2xl border border-slate-200 shadow-sm flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="font-bold flex items-center gap-2 text-lg text-[#0F172A]">
                                <MessageCircle size={24} className="text-[#FF8A00]" /> AI Assistant
                            </h1>
                            <p className="text-sm text-slate-500 hidden sm:block">Ask me anything about poultry farming, vaccination, feeding, or farm management!</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white border-x border-slate-200">
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-[15px] leading-relaxed ${
                                    msg.role === "user"
                                    ? "bg-[#FF8A00] text-white rounded-tr-none shadow-md"
                                    : "bg-[#F8FAFC] border border-slate-200 text-[#0F172A] rounded-tl-none shadow-sm"
                                } whitespace-pre-wrap break-words`}
                            >
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ul: (props) => <ul className="list-disc ml-4 my-2" {...props} />,
                                        ol: (props) => <ol className="list-decimal ml-4 my-2" {...props} />,
                                        li: (props) => <li className="my-1" {...props} />,
                                        p: (props) => <p className="mb-2 last:mb-0" {...props} />,
                                        strong: (props) => <strong className="font-bold text-[#0F172A]" {...props} />,
                                        a: (props) => <a className="text-[#FF8A00] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-[#F8FAFC] p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                                <Loader2 className="w-5 h-5 animate-spin text-[#FF8A00]" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border border-slate-200 rounded-b-2xl shadow-sm">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        className="flex items-center gap-3 relative"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask AI Assistant..."
                            className="flex-1 p-4 pr-12 bg-[#F1F5F9] border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF8A00] text-[#0F172A] placeholder-slate-400"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 bg-[#FF8A00] text-white rounded-full hover:bg-[#ea580c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </form>
                    <div className="text-center mt-3 text-xs text-slate-400">
                        I am an AI assistant. For serious veterinary emergencies, contact a local professional immediately.
                    </div>
                </div>
            </main>
        </div>
    );
}
