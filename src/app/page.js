// app/page.js

import ChallengeAccord from "@/components/ChallengeAccord";

async function fetchChallenges() {
  let challenges = [];

  try {
    const req = await fetch("http://localhost:3000/api/allchallenges"); // Make sure the URL is correct
    const data = await req.json();
    challenges = data.data;
  } catch (error) {
    console.log("Error fetching challenges:", error);
  }

  return challenges;
}

export default async function ChallengesPage() {
  const challenges = await fetchChallenges();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          LLM vulnerability Challenges
        </h1>
        <ChallengeAccord challenges={challenges} />
      </div>
    </div>
  );
}
