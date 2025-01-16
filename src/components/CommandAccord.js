"use client";

import React, { useState } from "react";

const CommandAccord = ({ commands }) => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleChallenge = (id) => {
    setActiveChallenge(activeChallenge === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {commands.map((cmd, index) => (
        <div
          key={index + 1}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleChallenge(index + 1)}
            className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium text-gray-800">
                Query {index + 1}
              </span>
            </div>
            <span
              className={`transform transition-transform ${
                activeChallenge === index + 1 ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              activeChallenge === index + 1 ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-white">
              <p className="text-gray-600 mb-4">{cmd}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandAccord;
