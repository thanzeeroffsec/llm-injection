import ChatBox from "@/components/ChatBox";
import CommandAccord from "@/components/CommandAccord";
import { tasks } from "@/data/command1";
import { rewriteCommands } from "@/data/rewriteCommand";
import { systemCommands } from "@/data/systemCommand";
import Link from "next/link";
import React from "react";
import { Toaster } from "react-hot-toast";

async function fetchChallenge(id) {
  let challenges = [];

  try {
    const req = await fetch(`http://localhost:3000/api/challenge/${id}`); // Make sure the URL is correct
    const data = await req.json();
    challenges = data.challenge;
  } catch (error) {
    console.log("Error fetching challenges:", error);
  }

  return challenges;
}

const Page = async ({ params }) => {
  const { challengeId } = await params;
  const challege = await fetchChallenge(challengeId);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br flex  p-6 justify-center ">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#fff",
            color: "#363636",
          },
          success: {
            duration: 3000,
          },
        }}
      />
      {challengeId == 7 && (
        <div className="flex flex-col w-[30%] h-[700px] overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">
            System Prompts
          </h1>
          <div>
            <CommandAccord commands={systemCommands} />
          </div>
        </div>
      )}
      <div className="max-w-4xl w-full h-full flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col space-y-6 justify-center min-h-[700px] h-fit">
          {/* Back Button */}
          <Link
            href={"/"}
            className="self-start bg-[#495057] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#343a40] mb-5"
          >
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center space-y-5">
            <h1 className="text-4xl font-bold text-gray-900">
              {challege?.title}
            </h1>
            <hr />
            <p className="text-[1rem] text-[#6C757D]">
              {challege?.description}
            </p>
            <hr />
            <p className="text-sm text-[#6C757D] font-semibold">
              {challege?.task}
            </p>
          </div>
          <ChatBox challengeId={challengeId} />
        </div>
      </div>
      {(challengeId == 6 || challengeId == 7) && (
        <div className="flex flex-col w-[30%] h-[700px] overflow-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-5">
            {challengeId == 6 ? "List of Prompts" : "Rewrite Prompts"}
          </h1>
          <div>
            <CommandAccord
              commands={challengeId == 6 ? tasks : rewriteCommands}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
