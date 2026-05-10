const response = await fetch("http://149.28.249.6:11434/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "llama3:latest",
    prompt: req.body.prompt,
    stream: false
  })
});
