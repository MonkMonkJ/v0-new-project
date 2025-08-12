'use client';
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setReply(data.reply || 'No response yet.');
  }

  return (
    <main style={{ padding: '20px' }}>
      <h1>Welcome to my customized AI App</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={4}
          cols={50}
          placeholder="Ask your AI question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <br />
        <button type="submit">Send to AI</button>
      </form>
      <div style={{ marginTop: 20 }}>
        <h2>AI Response:</h2>
        <p>{reply}</p>
      </div>
    </main>
  );
}
