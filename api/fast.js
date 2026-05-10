export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },

        body: JSON.stringify({

          model: "gpt-4.1-mini",

          messages: [

            {
              role: "system",
              content:
                "You are CornellBot, a physics-first AI for engineering and systems design. Answer clearly, intelligently, and concisely like an excellent engineering tutor. Use scientific reasoning and modern engineering thinking."
            },

            {
              role: "user",
              content: req.body.prompt
            }

          ],

          temperature: 0.7,
          max_tokens: 300
        })
      }
    );

    const data = await response.json();

    res.status(200).json({
      response: data.choices[0].message.content
    });

  } catch (error) {

    res.status(500).json({
      response: "Server error: " + error.message
    });

  }

}
