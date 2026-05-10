export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("http://149.28.249.6:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3.2:1b",
        prompt: req.body.prompt,
        stream: false
      })
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({
        response: "Ollama error: " + data.error
      });
    }

    res.status(200).json({
      response: data.response || JSON.stringify(data)
    });

  } catch (error) {
    res.status(500).json({
      response: "Server error: " + error.message
    });
  }
}
