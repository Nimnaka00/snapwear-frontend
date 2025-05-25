import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import aiLogo from "../../assets/ai/ai-logo.png";
import gradientBg from "../../assets/ai/gradiant.png";
import axios from "axios";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animateStar, setAnimateStar] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    return () => {
      setAnimateStar(true);
    };
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, typing]);

  const sendToBackend = async (message) => {
    const response = await axios.post("http://localhost:8000/api/v1/chat", {
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });
    return response.data.response;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = { role: "me", type: "text", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);
    setLoading(true);

    try {
      const aiReply = await sendToBackend(input);

      setTimeout(() => {
        setTyping(false);
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            type: "text",
            content: aiReply,
            originalUserInput: input,
          },
        ]);
      }, 1000);
    } catch (error) {
      console.error("Error contacting AI backend:", error);
      setTyping(false);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", type: "text", content: "❌ Error talking to AI server." },
      ]);
    }
  };

  const handleRegenerate = async (index) => {
    const originalUserInput = messages[index].originalUserInput;
    if (!originalUserInput) return;

    setRegeneratingIndex(index);
    try {
      const newReply = await sendToBackend(originalUserInput);

      setMessages((prev) =>
        prev.map((msg, i) =>
          i === index ? { ...msg, content: newReply } : msg
        )
      );
    } catch (error) {
      console.error("Error regenerating message:", error);
    }
    setRegeneratingIndex(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#13151B] flex flex-col items-center justify-between text-[#FBFBFB] font-poppins">
      {/* Background */}
      <img
        src={gradientBg}
        alt="gradient background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
      />

      {/* Header */}
      <div className="flex flex-col items-center mt-12 z-10">
        <img
          src={aiLogo}
          alt="AI Logo"
          className={`w-8 h-8 mb-4 ${animateStar ? "animate-pulse" : ""}`}
        />
        <h1 className="text-[24px] font-normal" style={{ color: "#FBFBFB" }}>
          Ask our AI about fashion
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-4xl overflow-y-auto px-4 py-10 space-y-8 z-10">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col items-start ${
              msg.role === "me" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-start">
              {msg.role === "ai" && (
                <img
                  src={aiLogo}
                  alt="AI Avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div
                className={`px-4 py-2 rounded-md max-w-xs text-sm flex items-start justify-start ${
                  msg.role === "me"
                    ? "bg-[#ffffff20] text-white border border-white"
                    : "bg-transparent text-white border border-[#ffffff40]"
                }`}
              >
                {regeneratingIndex === index ? (
                  <div className="w-32 h-5 bg-gray-300 animate-pulse opacity-30"></div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                )}
              </div>
              {msg.role === "me" && (
                <img
                  src="https://ui-avatars.com/api/?name=You"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
            </div>

            {/* Stylish Regenerate Button */}
            {msg.role === "ai" && (
              <button
                onClick={() => handleRegenerate(index)}
                className="flex items-center gap-1 text-xs mt-2 ml-10 text-[#D6FFF6] px-3 py-1 border border-[#D6FFF6] rounded-full hover:bg-[#D6FFF6] hover:text-[#13151B] transition-all duration-300"
                disabled={regeneratingIndex === index}
              >
                {regeneratingIndex === index ? (
                  <>
                    <AiOutlineLoading3Quarters
                      className="animate-spin"
                      size={14}
                    />
                    Regenerating...
                  </>
                ) : (
                  <>🔁 Regenerate</>
                )}
              </button>
            )}
          </div>
        ))}

        {/* Typing Animation */}
        {typing && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-md max-w-xs text-sm bg-transparent text-white border border-[#ffffff40] flex items-center gap-2">
              <span>AI is typing</span>
              <span className="flex items-center gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.2s]">.</span>
                <span className="animate-bounce [animation-delay:0.4s]">.</span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSend}
        className="w-full max-w-4xl px-4 pb-8 flex items-center z-10"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about fashion"
          className="flex-1 bg-[#0e0e0e] text-white px-5 py-3 rounded-md border border-[#333] focus:outline-none focus:ring-2 focus:ring-[#D6FFF6] placeholder:text-gray-400 text-sm"
        />
        <button
          type="submit"
          disabled={loading || typing}
          className={`ml-2 p-3 rounded-md bg-[#0e0e0e] hover:bg-[#1f1f1f] border border-[#333] transition flex items-center justify-center ${
            loading || typing ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading || typing ? (
            <AiOutlineLoading3Quarters
              className="animate-spin text-[#D6FFF6]"
              size={20}
            />
          ) : (
            <FiSend size={20} className="text-[#D6FFF6]" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
