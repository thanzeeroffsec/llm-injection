import React from "react";
import ChatBotContent from "./ChatBotContent";

const Llm01 = ({ flag }) => {
  return (
    <span
      className={`font-medium text-lg ${
        flag === 1 ? "text-[#38B000] font-semibold" : "text-black"
      }`}
    >
      {flag === 1
        ? "privileage escalated successully "
        : "no root access , so command execution not possible"}
    </span>
  );
};
const Llm03 = ({ poison, setPoison }) => {
  return (
    <div className="flex  w-full justify-around">
      <div className="flex gap-3 items-center">
        <input
          type="radio"
          id="poison"
          name="poison"
          value="False" // Set the value of this radio button
          checked={poison === "False"} // Check if poison is equal to the value
          className="h-5 w-5"
          onChange={(e) => setPoison(e.target.value)}
        />

        <label htmlFor="poison" className="text-lg font-medium">
          Good Plugin
        </label>
      </div>
      <div className="flex gap-3 items-center">
        <input
          type="radio"
          id="poison1"
          name="poison"
          value="True"
          checked={poison === "True"}
          className="h-5 w-5"
          onChange={(e) => setPoison(e.target.value)}
        />
        <label htmlFor="poison1" className="text-lg font-medium">
          Bad Plugin
        </label>
      </div>
    </div>
  );
};

const Llm04 = ({ poison, setPoison }) => {
  return (
    <div className="flex  w-full justify-around">
      <div className="flex gap-3 items-center">
        <input
          type="radio"
          id="poison"
          name="poison"
          value="False" // Set the value of this radio button
          checked={poison === "False"} // Check if poison is equal to the value
          className="h-5 w-5"
          onChange={(e) => setPoison(e.target.value)} // Convert value to number
        />

        <label htmlFor="poison" className="text-lg font-medium">
          Good Dataset
        </label>
      </div>
      <div className="flex gap-3 items-center">
        <input
          type="radio"
          id="poison1"
          name="poison"
          value="True"
          checked={poison === "True"}
          className="h-5 w-5"
          onChange={(e) => setPoison(e.target.value)}
        />
        <label htmlFor="poison1" className="text-lg font-medium">
          Bad Dataset
        </label>
      </div>
    </div>
  );
};

const Llm10 = ({ llm10, setLlm10 }) => {
  return (
    <div className="flex  w-full justify-around">
      <div className="flex gap-3 items-center">
        <input
          type="radio"
          id="llm10"
          name="llm10"
          value={0} // Set the value of this radio button
          checked={llm10 === 0} // Check if poison is equal to the value
          className="h-5 w-5"
          onChange={(e) => setLlm10(parseInt(e.target.value))} // Convert value to number
        />

        <label htmlFor="llm10" className="text-lg font-medium">
          Vulnerability off
        </label>
      </div>
      <div className="flex gap-3 items-center">
        <input
          type="radio"
          id="llm101"
          name="llm101"
          value={1}
          checked={llm10 === 1}
          className="h-5 w-5"
          onChange={(e) => setLlm10(parseInt(e.target.value))}
        />
        <label htmlFor="llm101" className="text-lg font-medium">
          Vulnerability on
        </label>
      </div>
    </div>
  );
};
const ChatBoxLogic = ({
  challengeId,
  flag,
  poison,
  setPoison,
  title,
  llm10,
  setLlm10,
}) => {
  return (
    <ChatBotContent title={title}>
      {challengeId == 1 && <Llm01 flag={flag} />}
      {challengeId == 3 && <Llm03 poison={poison} setPoison={setPoison} />}
      {challengeId == 4 && <Llm04 poison={poison} setPoison={setPoison} />}
      {challengeId == 10 && <Llm10 llm10={llm10} setLlm10={setLlm10} />}
    </ChatBotContent>
  );
};

export default ChatBoxLogic;
