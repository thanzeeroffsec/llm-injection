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
  const [llm10, setLlm10] = useState(0);
  const [isRadioButtonNeeded, setRadioButtonNeeded] = useState(false);

  const determineRadioButtonRequirement = () => {
    setRadioButtonNeeded(challengeId === 3 || challengeId === 4);
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

      if (challengeId == 3) {
        body.poison = poison;
      }
      if (challengeId == 4) {
        body.poison = poison;
      }
      if (challengeId == 7) {
        body.flag = flag;
      }
      if (challengeId == 10) {
        body.flag = llm10;
      }
      if (isRadioButtonNeeded) {
        body.poison = poison;
      }

      const makeRequest = async () => {
        const response = await fetch("/api/challenge", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        return response.json();
      };

      let data;

      if (challengeId == 10 && llm10 === 1) {
        for (let i = 0; i <= 50; i++) {
          try {
            data = await makeRequest();

            setMessages((prev) => {
              const lastMessage = prev[prev.length - 1];
              const updatedMessage = {
                ...lastMessage,
                ai: (lastMessage.ai || "") + (data.message || ""),
              };
              return [...prev.slice(0, -1), updatedMessage];
            });

            // Delay between requests
            await new Promise((resolve) => setTimeout(resolve, 200));
          } catch (error) {
            console.error(`Error in iteration ${i}:`, error);
            toast.error("Something went wrong during message processing.");
            break;
          }
        }
      } else {
        data = await makeRequest();
        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, ai: data?.message || "Error!" }
              : msg
          )
        );
      }

      if (data.flag === 1 || data.flag == "1") {
        toast.success("Challenge completed successfully!");
        //setFlag(data.flag);

        const challenges =
          JSON.parse(localStorage.getItem("challengesStatus")) || {};
        challenges[challengeId] = "completed";
        localStorage.setItem("challengesStatus", JSON.stringify(challenges));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    determineRadioButtonRequirement();
  }, [challengeId]);

  const title =
    {
      1: "Command Line",
      3: "Choose Plugin",
      4: "Choose Dataset",
    }[challengeId] || "";

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

      {![2, 5, 6, 7, 8, 9].includes(challengeId) && (
        <ChatBoxLogic
          flag={flag}
          challengeId={challengeId}
          title={title}
          poison={poison}
          llm10={llm10}
          setLlm10={setLlm10}
          setPoison={setPoison}
        />
      )}
    </>
  );
};

export default ChatBox;
