"use client";

import React, { useEffect, useState } from "react";
import ChatBoxLogic from "./ChatBoxLogic";
import toast from "react-hot-toast";

const ChatBox = ({ challengeId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(0);
  const [poison, setPoison] = useState("False");
  const [isRadioButtonNeeded, setRadioButtonNeeded] = useState(false);

  const setRadioButton = () => {
    let isPoisonNeeded = challengeId === 3 || challengeId === 4;
    setRadioButtonNeeded(isPoisonNeeded);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Append user's message to the chat
    const userMessage = { user: input, ai: null };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const body = { challengeId, input };

      // Conditionally add poison to the body if isRadioButtonNeeded is true
      if (isRadioButtonNeeded) {
        body.poison = poison;
      }

      const response = await fetch("/api/challenge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      setFlag(data.flag);

      if (data.flag === 1) {
        toast.success("challenge completed successfully");
      }
      // Update AI's response in the latest message
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, ai: data.message } : msg
        )
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }

    // Clear input field
    setInput("");
  };

  const title =
    challengeId === 1
      ? "Command Line"
      : challengeId === 3
      ? "Choose Plugin"
      : challengeId === 4
      ? "Choose Dataset"
      : "";

  useEffect(() => {
    setRadioButton();
  }, []);

  return (
    <>
      {/* Chat Box */}
      <div className="rounded-lg p-4 min-h-16 max-h-[500px] overflow-y-auto shadow-lg">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-4">
              {/* User Message */}
              <div className="text-right">
                <p className="inline-block bg-blue-500 text-white rounded-xl px-4 py-2 shadow-md">
                  {msg.user}
                </p>
              </div>
              {/* AI Response */}
              {msg.ai && (
                <div className="text-left mt-2">
                  <p className="inline-block bg-gray-200 text-gray-800 rounded-xl px-4 py-2 shadow-md">
                    {msg.ai}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            Start your conversation...
          </p>
        )}
      </div>

      {/* Input and Send Button */}
      <form onSubmit={handleSubmit} className="relative mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="w-full bg-gray-100 rounded-full px-4 py-4 text-gray-700 placeholder-gray-400 shadow-md focus:outline-none focus:ring focus:ring-gray-300"
          disabled={loading}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#495057] text-white rounded-full px-4 py-2 text-sm shadow-md hover:bg-[#343a40] ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {challengeId !== 2 &&
        challengeId !== 5 &&
        challengeId !== 6 &&
        challengeId !== 7 &&
        challengeId !== 8 &&
        challengeId !== 9 && (
          <ChatBoxLogic
            flag={flag}
            challengeId={challengeId}
            title={title}
            poison={poison}
            setPoison={setPoison}
          />
        )}
    </>
  );
};

export default ChatBox;
