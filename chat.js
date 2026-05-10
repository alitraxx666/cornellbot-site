export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const response = await fetch("http://YOUR_VULTR_IP:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "llama3:latest",
      prompt: req.body.prompt,
      stream: false
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}