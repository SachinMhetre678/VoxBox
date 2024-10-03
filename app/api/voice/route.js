// app/pages/api/voice.js
export async function POST(req) {
    const { text } = await req.json();
  
    // Here you can integrate a TTS service or return a modified message
    return new Response(JSON.stringify({ message: `You said: ${text}` }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  