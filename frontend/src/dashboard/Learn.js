import React, { useState, useEffect, useRef } from "react";

const Learn = () => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 1. PLACE YOUR API KEY HERE
  const API_KEY = "AIzaSyB0CaDSm2UKlzDC4iP0IHN_ZHkyi4ZDsuY";

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const handleSend = async () => {
    if (!userInput.trim()) return;
  
    const currentInput = userInput;
    setLoading(true);
    setUserInput("");
    setChatHistory((prev) => [...prev, { role: "user", text: currentInput }]);
  
    try {
      const response = await fetch(
        // UPDATED URL: Using v1 (Stable) and gemini-2.5-flash
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: currentInput }]
            }]
          })
        }
      );
  
      const data = await response.json();
  
      if (data.error) {
        // If you get a 403 or 429 here, it means the API Key is restricted or over quota
        throw new Error(data.error.message);
      }
  
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        const botText = data.candidates[0].content.parts[0].text;
        setChatHistory((prev) => [...prev, { role: "bot", text: botText }]);
      } else {
        throw new Error("Gemini is currently unavailable. Please try again in a moment.");
      }
    } catch (error) {
      setChatHistory((prev) => [
        ...prev, 
        { role: "bot", text: `❌ ${error.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ borderBottom: '2px solid #007bff', marginBottom: '20px' }}>
        <h2 style={{ color: '#333' }}>Stock Market Learning Assistant</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Ask me about technical analysis, P/E ratios, or market trends.</p>
      </div>
      
      {/* Chat Display Area */}
      <div style={{ 
        height: '450px', 
        overflowY: 'auto', 
        background: '#f9f9f9', 
        padding: '20px', 
        borderRadius: '12px', 
        border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {chatHistory.length === 0 && (
          <p style={{ textAlign: 'center', color: '#aaa', marginTop: '150px' }}>
            Try asking: "What is a stop-loss order?"
          </p>
        )}
        
        {chatHistory.map((msg, i) => (
          <div key={i} style={{ 
            marginBottom: '15px', 
            textAlign: msg.role === 'user' ? 'right' : 'left',
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '80%'
          }}>
            <div style={{ 
              display: 'inline-block', 
              padding: '12px 16px', 
              borderRadius: '18px', 
              background: msg.role === 'user' ? '#007bff' : '#ffffff',
              color: msg.role === 'user' ? '#fff' : '#333',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              lineHeight: '1.5',
              whiteSpace: 'pre-wrap' // Keeps the formatting (lists, etc.) from Gemini
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: '#007bff', fontStyle: 'italic', fontSize: '13px' }}>Gemini is thinking...</div>}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <input 
          style={{ 
            flex: 1, 
            padding: '12px 15px', 
            borderRadius: '25px', 
            border: '1px solid #ccc',
            outline: 'none'
          }}
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your question here..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend} 
          disabled={loading}
          style={{ 
            padding: '10px 25px', 
            background: loading ? '#ccc' : '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '25px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>
    </div>
  );
};

export default Learn;