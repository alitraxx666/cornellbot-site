export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are CornellBot, a physics-first AI for engineering and systems design. Answer clearly, intelligently, and concisely like an excellent engineering tutor. Use physics principles, equations, and real engineering examples when helpful. Never say you are ChatGPT."
          },
          {
            role: "user",
            content: req.body.prompt
          }
        ],
        max_tokens: 350,
        temperature: 0.5
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        response: "OpenAI error: " + (data.error?.message || JSON.stringify(data))
      });
    }

    res.status(200).json({
      response: data.choices?.[0]?.message?.content || "No response from OpenAI"
    });

  } catch (error) {
    res.status(500).json({
      response: "Server error: " + error.message
    });
  }
}
