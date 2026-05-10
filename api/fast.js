export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        input: `
You are CornellBot, a physics-first AI for engineering and systems design.
Answer clearly, intelligently, and concisely like an excellent engineering tutor.
Use physics, scientific reasoning, and real engineering examples when helpful.

User question:
${req.body.prompt}
`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({
        response: "OpenAI error: " + (data.error?.message || JSON.stringify(data))
      });
    }

    res.status(200).json({
      response: data.output_text || "No response from OpenAI"
    });

  } catch (error) {
    res.status(500).json({
      response: "Server error: " + error.message
    });
  }
}
