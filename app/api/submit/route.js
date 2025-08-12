export async function POST(request) {
  const { message } = await request.json();

  if (!message) {
    return new Response(JSON.stringify({ reply: 'No message received' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ reply: 'API key not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{ role: 'user', content: message }],
      }),
    });

    const openaiData = await openaiRes.json();

    const reply = openaiData.choices?.[0]?.message?.content || 'No reply';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ reply: 'Error communicating with AI' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

