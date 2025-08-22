// src/pages/ai/Chatbot.jsx
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import aiLogo from "../../assets/ai/ai-logo.png";
import gradientBg from "../../assets/ai/gradiant.png";
import axios from "axios";

/* ---------------- helpers ---------------- */

// pull <a href="...">label</a> out of the AI HTML-ish text
const extractLinks = (htmlish) => {
  const links = [];
  const re = /<a\s+[^>]*href=['"]([^'"]+)['"][^>]*>(.*?)<\/a>/gi;
  let m;
  while ((m = re.exec(htmlish)) !== null) {
    const rawHref = m[1];
    const label = m[2].replace(/<[^>]+>/g, "").trim();
    links.push({ rawHref, label });
  }
  return links;
};

// turn any http(s)://.../(product|products)/:id into SPA path /product/:id
const toInternalProductPath = (rawHref) => {
  try {
    const url = new URL(rawHref, window.location.origin);
    const parts = url.pathname.split("/").filter(Boolean); // ["products", "6817..."]
    if (parts.length >= 2 && /^products?$/.test(parts[parts.length - 2])) {
      const id = parts[parts.length - 1];
      // basic sanity check (Mongo-like id or at least something non-trivial)
      if (id && id.length >= 8) return `/product/${id}`;
    }
  } catch {
    /* ignore */
  }
  return null; // unknown link; caller will fallback
};

// show only text in the bubble (no HTML)
const stripHtmlToText = (htmlish) =>
  htmlish
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .trim();

/* ---------------- AI message card ---------------- */

const AIReply = ({ content, index, onRegenerate, regenerating }) => {
  const navigate = useNavigate();
  const text = stripHtmlToText(content);
  const links = extractLinks(content);

  const handleClick = (rawHref) => {
    const path = toInternalProductPath(rawHref);
    navigate(path || "/shop"); // ✅ SPA navigation in same tab
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-start">
        <img
          src={aiLogo}
          alt="AI Avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div className="px-4 py-3 rounded-2xl max-w-2xl text-[15px] leading-relaxed bg-transparent text-white border border-white/30 backdrop-blur-sm">
          {text ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : (
            <p className="opacity-80">Here are some picks for you ✨</p>
          )}

          {links.length > 0 && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {links.map(({ rawHref, label }, i) => (
                <button
                  key={`${rawHref}-${i}`}
                  type="button"
                  onClick={() => handleClick(rawHref)}
                  className="group text-left relative overflow-hidden rounded-xl border border-[#D6FFF6]/40 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="p-3 pr-12">
                    <div className="text-sm font-medium text-[#D6FFF6] group-hover:text-white transition-colors">
                      {label || "View item"}
                    </div>
                    <div className="text-[12px] text-white/60">
                      View details
                    </div>
                  </div>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D6FFF6] group-hover:text-white transition-transform group-hover:translate-x-0.5">
                    ➜
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onRegenerate(index)}
        className="flex items-center gap-1 text-xs mt-2 ml-10 text-[#D6FFF6] px-3 py-1 border border-[#D6FFF6] rounded-full hover:bg-[#D6FFF6] hover:text-[#13151B] transition-all duration-300 disabled:opacity-60"
        disabled={regenerating}
      >
        {regenerating ? (
          <>
            <AiOutlineLoading3Quarters className="animate-spin" size={14} />
            Regenerating…
          </>
        ) : (
          <>🔁 Regenerate</>
        )}
      </button>
    </div>
  );
};

/* ---------------- main component ---------------- */

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animateStar, setAnimateStar] = useState(false);
  const [regeneratingIndex, setRegeneratingIndex] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => () => setAnimateStar(true), []);
  useEffect(() => {
    if (bottomRef.current) {
      setTimeout(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, [messages, typing]);

  const sendToBackend = async (message) => {
    const { data } = await axios.post("http://localhost:9000/api/v1/chat", {
      messages: [{ role: "user", content: message }],
    });
    return String(data.response ?? "");
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "me", type: "text", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);
    setLoading(true);

    try {
      const aiReply = await sendToBackend(userMessage.content);
      setTimeout(() => {
        setTyping(false);
        setLoading(false);
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            type: "text",
            content: aiReply,
            originalUserInput: userMessage.content,
          },
        ]);
      }, 500);
    } catch (err) {
      console.error("AI error:", err);
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
        prev.map((m, i) => (i === index ? { ...m, content: newReply } : m))
      );
    } catch (err) {
      console.error("Regenerate error:", err);
    }
    setRegeneratingIndex(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#13151B] flex flex-col items-center justify-between text-[#FBFBFB] font-poppins">
      <img
        src={gradientBg}
        alt="gradient background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      />

      <div className="flex flex-col items-center mt-12 z-10">
        <img
          src={aiLogo}
          alt="AI Logo"
          className={`w-8 h-8 mb-4 ${animateStar ? "animate-pulse" : ""}`}
        />
        <h1 className="text-[24px] font-normal">Ask our AI about fashion</h1>
      </div>

      <div className="flex-1 w-full max-w-4xl overflow-y-auto px-4 py-10 space-y-8 z-10">
        {messages.map((msg, index) =>
          msg.role === "ai" ? (
            <AIReply
              key={index}
              content={msg.content}
              index={index}
              onRegenerate={handleRegenerate}
              regenerating={regeneratingIndex === index}
            />
          ) : (
            <div key={index} className="flex justify-end">
              <div className="flex items-start">
                <div className="px-4 py-3 rounded-2xl max-w-2xl text-[15px] leading-relaxed bg-white/10 text-white border border-white/30">
                  <p className="whitespace-pre-wrap break-words">
                    {msg.content}
                  </p>
                </div>
                <img
                  src="https://ui-avatars.com/api/?name=You"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full ml-2"
                />
              </div>
            </div>
          )
        )}

        {typing && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl max-w-xs text-sm bg-transparent text-white border border-white/30 flex items-center gap-2">
              <span>AI is typing</span>
              <span className="flex items-center gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce [animation-delay:0.15s]">
                  .
                </span>
                <span className="animate-bounce [animation-delay:0.3s]">.</span>
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

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
