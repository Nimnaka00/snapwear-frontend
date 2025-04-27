import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Spinner Icon
import aiLogo from "../../assets/ai/ai-logo.png";
import gradientBg from "../../assets/ai/gradiant.png";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false); // New: loading spinner state
  const [animateStar, setAnimateStar] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    return () => {
      setAnimateStar(true);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newMessages = [...messages, { role: "me", type: "text", content: input }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);
    setLoading(true);

    setTimeout(() => {
      setTyping(false);
      setLoading(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", type: "text", content: "👗 I can help you pick the perfect outfit!" },
      ]);
    }, 1500);
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
        <h1 className="text-[24px] font-normal" style={{ color: '#FBFBFB' }}>
          Ask our AI about fashion
        </h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 w-full max-w-4xl overflow-y-auto px-4 py-10 space-y-6 z-10">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2 rounded-md max-w-xs text-sm flex items-center justify-center ${
                msg.role === "me"
                  ? "bg-[#ffffff20] text-white border border-white"
                  : "bg-transparent text-white border border-[#ffffff40]"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {/* Typing Animation */}
        {typing && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-md max-w-xs text-sm bg-transparent text-white border border-[#ffffff40] flex items-center gap-2">
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
          disabled={loading}
          className={`ml-2 p-3 rounded-md bg-[#0e0e0e] hover:bg-[#1f1f1f] border border-[#333] transition flex items-center justify-center ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-[#D6FFF6]" size={20} />
          ) : (
            <FiSend size={20} className="text-[#D6FFF6]" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
