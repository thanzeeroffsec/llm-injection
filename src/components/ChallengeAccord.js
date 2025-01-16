"use client";
import Link from "next/link";
import React, { useState } from "react";

const ChallengeAccord = ({ challenges }) => {
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleChallenge = (id) => {
    setActiveChallenge(activeChallenge === id ? null : id);
  };

  const handleStartChallenge = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {loading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      {challenges?.map((challenge) => (
        <div
          key={challenge.id}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => toggleChallenge(challenge.id)}
            className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <span
                className={`text-sm px-2 py-1 rounded-md font-medium ${
                  challenge.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {challenge.completed ? "Completed" : "Not Completed"}
              </span>
              <span className="text-lg font-medium text-gray-800">
                {challenge.title}
              </span>
            </div>
            <span
              className={`transform transition-transform ${
                activeChallenge === challenge.id ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${
              activeChallenge === challenge.id ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-white">
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              <Link
                href={`/chat/${challenge?.id}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={handleStartChallenge}
              >
                Start Challenge
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengeAccord;
