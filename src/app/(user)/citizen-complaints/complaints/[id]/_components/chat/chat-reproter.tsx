"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react"; // Ikon untuk chat
import { Avatar } from "@/components/ui/avatar"; // Jika ingin menambahkan avatar
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatComplaints = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "John", time: "10:00 AM" },
    { id: 2, text: "How are you?", sender: "Alice", time: "10:05 AM" },
  ]);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: message,
          sender: "You",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Card className="shadow-md mb-4">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-lg">Chat with Alice</CardTitle>
          <Badge variant="outline" className="text-primary border-primary">
            Online
          </Badge>
        </CardHeader>
      </Card>

      {/* Message List */}
      <ScrollArea className="flex-1 p-4 space-y-4 bg-gray-50">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              {message.sender !== "You" && (
                <Avatar className="mr-2">{message.sender.charAt(0)}</Avatar>
              )}
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                } shadow-sm`}
              >
                <p>{message.text}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Text Input and Send Button */}
      <div className="p-4 bg-white shadow-md">
        <div className="flex gap-4">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button variant="default" onClick={handleSendMessage}>
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComplaints;
